import os
import json
LANGUAGE_EXTENSIONS = {
    '.py': 'Python',
    '.go': 'Go',
    '.js': 'JavaScript',
    '.ts': 'TypeScript',
    '.java': 'Java',
    '.cpp': 'C++',
    '.c': 'C',
    '.rb': 'Ruby',
    '.rs': 'Rust',
    '.sh': 'Shell',
    '.yaml': 'YAML',
    '.yml': 'YAML',
    '.md': 'Markdown',
    '.ipynb': 'Jupyter Notebook',
    '.Dockerfile': 'Dockerfile'
}
def load_text_file(filepath, max_chars=3000):
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            return f.read(max_chars)
    except Exception:
        return ""
def extract_notebook_text(filepath, max_chars=3000):
    try:
        import json
        with open(filepath, "r", encoding="utf-8") as f:
            nb = json.load(f)
            text = ""
            for cell in nb.get('cells', []):
                if cell.get('cell_type') == 'markdown':
                    text += "".join(cell.get('source', [])) + "\n"
            return text[:max_chars]
    except Exception:
        return ""
def detect_language(file_path):
    ext = os.path.splitext(file_path)[1]
    return LANGUAGE_EXTENSIONS.get(ext, None)
def scan_repo(repo_path):
    languages = []
    folder_structure = []
    key_files_content = {}
    extracted_documents = {}
    for root, dirs, files in os.walk(repo_path):
        for d in dirs:
            rel_path = os.path.relpath(os.path.join(root, d), repo_path)
            folder_structure.append(rel_path)
        for file in files:
            file_path = os.path.join(root, file)
            rel_file_path = os.path.relpath(file_path, repo_path)
            lang = detect_language(file)
            if lang:
                languages.append(lang)
            if file in ['README.md', 'catalog-info.yaml', 'mkdocs.yaml']:
                key_files_content[file] = load_text_file(file_path)
            if file.endswith(('.md', '.txt', '.py')):
                extracted_documents[rel_file_path] = load_text_file(file_path)
            if file.endswith('.ipynb'):
                extracted_documents[rel_file_path] = extract_notebook_text(file_path)
    languages = list(set(languages))
    repo_summary = {
        "repo_name": os.path.basename(repo_path),
        "languages_detected": languages,
        "key_files": key_files_content,
        "folder_structure": folder_structure,
        "extracted_documents": extracted_documents,
    }
    print(json.dumps(repo_summary, indent=2))
    return repo_summary
if __name__ == "__main__":
    import sys
    if len(sys.argv) != 2:
        print("Usage: python scanner.py /path/to/repo")
        sys.exit(1)
    scan_repo(sys.argv[1])