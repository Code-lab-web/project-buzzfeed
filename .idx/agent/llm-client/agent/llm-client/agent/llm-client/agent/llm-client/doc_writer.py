import os
import re
def clean_generated_markdown(content):
    """
    Cleans LLM output: removes trailing junk like extra code blocks or leftover prompts.
    """
    if content.count("```") > 2:
        parts = content.split("```")
        content = parts[0]  # Keep only before first block ends
    junk_phrases = [
        "The docs/index.md file has been generated",
        "You have completed",
        "The following structure was created",
        "This project demonstrates",
    ]
    for phrase in junk_phrases:
        if phrase in content:
            content = content.split(phrase)[0].strip()
    return content.strip()
def save_doc(base_path, filename, content):
    os.makedirs(base_path, exist_ok=True)
    filepath = os.path.join(base_path, filename)
    
    cleaned_content = clean_generated_markdown(content)
    
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(cleaned_content)