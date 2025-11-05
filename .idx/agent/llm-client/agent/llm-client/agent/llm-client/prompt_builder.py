def build_prompt_for_file(repo_summary):
    repo_name = repo_summary.get('repo_name', 'Unnamed Project')
    languages = ", ".join(repo_summary.get('languages_detected', [])) or "Unknown"
    extracted_docs = repo_summary.get('extracted_documents', {})
    sample_content = "\n\n".join(
        f"### {path}:\n{content[:300]}" for path, content in list(extracted_docs.items())[:2]
    )
    prompt = f"""
You are a technical documentation generator.
Below is some extracted project information:
---
Project Name: {repo_name}
Languages Used: {languages}
Sample Extracted Content:
{sample_content}
---
Ignore everything above.
Now output only a clean final Markdown file, with the following structure:
# {repo_name} Documentation
## Overview
(Brief description.)
## Contents
- Getting Started
- Architecture
- Deployment Guide
- Testing
- Troubleshooting
## Getting Started
## Architecture
## Deployment Guide
## Testing
## Troubleshooting
Important:
- Only output Markdown.
- No comments.
- No instructions.
- No filler text at the end.
- No "file generated" messages.
- Start at `# {repo_name} Documentation`.
- End after the Troubleshooting section.
Now start writing the final Markdown.
"""
    return prompt