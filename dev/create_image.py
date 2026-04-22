import argparse
import base64
import json
import os
from pathlib import Path

from azure.identity import DefaultAzureCredential, get_bearer_token_provider
from dotenv import load_dotenv
from openai import AzureOpenAI

load_dotenv(Path(__file__).with_name(".env"))

DEFAULT_ENDPOINT = os.getenv("AZURE_OPENAI_ENDPOINT", "")
DEFAULT_API_VERSION = "2025-04-01-preview"
DEFAULT_DEPLOYMENT = "gpt-image-2"
DEFAULT_SCOPE = "https://cognitiveservices.azure.com/.default"
DEFAULT_OUTPUT = "output.png"
DEFAULT_PROMPT = "A cute baby polar bear"


def build_client(endpoint: str, api_version: str) -> AzureOpenAI:
    token_provider = get_bearer_token_provider(
        DefaultAzureCredential(),
        DEFAULT_SCOPE,
    )
    return AzureOpenAI(
        api_version=api_version,
        azure_endpoint=endpoint,
        azure_ad_token_provider=token_provider,
    )


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Generate an image with Azure OpenAI gpt-image-2 using Entra ID authentication.",
    )
    parser.add_argument(
        "--prompt",
        default=os.getenv("AZURE_OPENAI_IMAGE_PROMPT", DEFAULT_PROMPT),
        help="Text prompt used to generate the image.",
    )
    parser.add_argument(
        "--endpoint",
        default=os.getenv("AZURE_OPENAI_ENDPOINT", DEFAULT_ENDPOINT),
        help="Azure OpenAI endpoint (cognitiveservices.azure.com).",
    )
    parser.add_argument(
        "--api-version",
        default=os.getenv("OPENAI_API_VERSION", DEFAULT_API_VERSION),
        help="Azure OpenAI API version.",
    )
    parser.add_argument(
        "--deployment",
        default=os.getenv("AZURE_OPENAI_IMAGE_DEPLOYMENT", DEFAULT_DEPLOYMENT),
        help="Azure OpenAI deployment name for the image model.",
    )
    parser.add_argument(
        "--size",
        default=os.getenv("AZURE_OPENAI_IMAGE_SIZE", "1024x1024"),
        help="Generated image size.",
    )
    parser.add_argument(
        "--output",
        default=os.getenv("AZURE_OPENAI_IMAGE_OUTPUT", DEFAULT_OUTPUT),
        help="Output file path.",
    )
    parser.add_argument(
        "--count",
        type=int,
        default=int(os.getenv("AZURE_OPENAI_IMAGE_COUNT", "1")),
        help="Number of images to request.",
    )
    return parser.parse_args()


def download_image(url: str) -> bytes:
    import urllib.request
    with urllib.request.urlopen(url) as resp:  # noqa: S310
        return resp.read()


def write_image_bytes(data: bytes, output_path: str) -> Path:
    target = Path(output_path)
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_bytes(data)
    return target


def main() -> None:
    args = parse_args()
    client = build_client(args.endpoint, args.api_version)

    kwargs: dict = {
        "model": args.deployment,
        "prompt": args.prompt,
    }
    if args.count != 1:
        kwargs["n"] = args.count
    if args.size != "1536x1024":
        kwargs["size"] = args.size

    result = client.images.generate(**kwargs)

    result_json = json.loads(result.model_dump_json())
    image_data = result_json["data"][0]

    if image_data.get("url"):
        image_bytes = download_image(image_data["url"])
        output_file = write_image_bytes(image_bytes, args.output)
    elif image_data.get("b64_json"):
        image_bytes = base64.b64decode(image_data["b64_json"])
        output_file = write_image_bytes(image_bytes, args.output)
    else:
        raise RuntimeError("Azure OpenAI returned no image payload.")

    print(f"Image saved to {output_file.resolve()}")


if __name__ == "__main__":
    main()