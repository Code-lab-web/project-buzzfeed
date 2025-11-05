from transformers import AutoModelForCausalLM, AutoTokenizer, pipeline
import os
class LLMClient:
    def __init__(self, model_id="microsoft/phi-2"):
        print(f"Loading model: {model_id}...")
        token = os.getenv("HUGGINGFACE_TOKEN")
        if token is None:
            raise RuntimeError("Missing HUGGINGFACE_TOKEN environment variable.")
        self.tokenizer = AutoTokenizer.from_pretrained(
            model_id,
            token=token,
            trust_remote_code=True
        )
        self.model = AutoModelForCausalLM.from_pretrained(
            model_id,
            device_map="auto",
            trust_remote_code=True,
            token=token
        )
        self.pipe = pipeline(
            "text-generation",
            model=self.model,
            tokenizer=self.tokenizer,
            device_map="auto",
            do_sample=True,
            temperature=0.7,
            top_p=0.9
        )
    def generate(self, prompt, max_tokens=800):
        print("Generating content from LLM...")
        
        max_model_tokens = 4096  # phi-2 supports up to 4k tokens
        prompt_tokens = len(self.tokenizer(prompt)["input_ids"])
        safe_max_tokens = min(max_tokens, max_model_tokens - prompt_tokens)
        if safe_max_tokens <= 0:
            raise ValueError(f"Prompt too large ({prompt_tokens} tokens)! Max {max_model_tokens} tokens.")
        response = self.pipe(
            prompt,
            max_new_tokens=safe_max_tokens
        )
        generated_text = response[0]["generated_text"]
        if prompt in generated_text:
            generated_text = generated_text.replace(prompt, "").strip()
        return generated_text
if __name__ == "__main__":
    client = LLMClient()
    test_prompt = "Write a detailed 'Getting Started' guide for a Kubernetes deployment."
    output = client.generate(test_prompt)
    print("\n[OUTPUT]\n")
    print(output)