"""Wrapper: read prompt from file and call create_image.py."""
import subprocess, sys, pathlib

prompt = pathlib.Path("dev/prompt_caf.txt").read_text(encoding="utf-8").strip()
cmd = [
    sys.executable, "dev/create_image.py",
    "--prompt", prompt,
    "--output", "docs/m365/copilot_adoption_framework/images/caf_overview.png",
    "--deployment", "gpt-image-2",
    "--size", "1536x1024",
]
sys.exit(subprocess.call(cmd))
