import json
import os
from llm_client import LLMClient
from prompt_builder import build_prompt_for_file
from doc_writer import save_doc
from jinja2 import Template
ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
TEMPLATE_PATHS = {
    "mkdocs.yaml": os.path.join(ROOT_DIR, "templates/mkdocs.yaml.tpl"),
    "catalog-info.yaml": os.path.join(ROOT_DIR, "templates/catalog-info.yaml.tpl"),
}
def render_template(template_path, variables):
    with open(template_path, "r") as f:
        content = f.read()
    template = Template(content)
    return template.render(**variables)
def generate_index_md_from_summary(repo_summary, docs_dir):
    extracted_docs = repo_summary.get("extracted_documents", {})
    repo_url = repo_summary.get("repo_url", None)
    repo_name = repo_summary.get("repo_name", "Repository")
    
    if extracted_docs:
        _, summary = next(iter(extracted_docs.items()))
        
        index_content = f"""---
title: "{repo_name} Documentation"
---
# Overview
{summary.strip()}
## Project Structure
This repository contains code and assets primarily written in:
{', '.join(repo_summary.get('languages_detected', [])) or 'Unknown'}
## Getting Started
- Review the main notebook or scripts.
- Follow installation instructions if available.
- Explore and extend the project.
{"\n\n---\n\n[View source code on GitHub](" + repo_url + ")" if repo_url else ""}
"""
        save_doc(docs_dir, "index.md", index_content)
    else:
        print("No extracted documents found, falling back to LLM...")
        client = LLMClient()
        prompt = build_prompt_for_file(repo_summary)
        generated_content = client.generate(prompt, max_tokens=2000)
        save_doc(docs_dir, "index.md", generated_content)
def generate_all_docs(repo_summary_path, repo_dir):
    with open(repo_summary_path, "r") as f:
        repo_summary = json.load(f)
    repo_name = repo_summary.get("repo_name", "unknown-repo")
    docs_dir = os.path.join(repo_dir, "docs")
    os.makedirs(docs_dir, exist_ok=True)
    # Create mkdocs.yaml
    mkdocs_path = os.path.join(repo_dir, "mkdocs.yaml")
    if not os.path.exists(mkdocs_path):
        print("Creating mkdocs.yaml from template...")
        mkdocs_content = render_template(TEMPLATE_PATHS["mkdocs.yaml"], {"repo_name": repo_name})
        with open(mkdocs_path, "w") as f:
            f.write(mkdocs_content)
    # Create catalog-info.yaml
    catalog_path = os.path.join(repo_dir, "catalog-info.yaml")
    if not os.path.exists(catalog_path):
        print("Creating catalog-info.yaml from template...")
        catalog_content = render_template(TEMPLATE_PATHS["catalog-info.yaml"], {"repo_name": repo_name})
        with open(catalog_path, "w") as f:
            f.write(catalog_content)
    # Create docs/index.md
    print(f"Creating index.md...")
    generate_index_md_from_summary(repo_summary, docs_dir)
if __name__ == "__main__":
    import sys
    if len(sys.argv) != 3:
        print("Usage: python generate_full_docs.py /path/to/repo-summary.json /path/to/repo")
        sys.exit(1)
    generate_all_docs(sys.argv[1], sys.argv[2])