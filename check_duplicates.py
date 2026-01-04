import re

content = open('/Users/user/Documents/ush/lomba/meta-airflow/src/screens/home/HomeScreen.tsx', 'r').read()

# Extract the styles object roughly
match = re.search(r'const styles = StyleSheet\.create\(\{([\s\S]*?)\}\);', content)
if match:
    styles_body = match.group(1)
    
    # Find all keys
    # Keys like "  container: {"
    items = re.findall(r'^\s*([a-zA-Z0-9_]+): \{', styles_body, re.MULTILINE)
    
    seen = set()
    duplicates = []
    for item in items:
        if item in seen:
            duplicates.append(item)
        seen.add(item)
        
    print(f"Top-level duplicates: {duplicates}")

    # Now verify inside each block
    blocks = re.finditer(r'^\s*([a-zA-Z0-9_]+): \{([\s\S]*?)\},', styles_body, re.MULTILINE)
    for block in blocks:
        name = block.group(1)
        body = block.group(2)
        props = re.findall(r'^\s*([a-zA-Z0-9_]+):', body, re.MULTILINE)
        
        seen_props = set()
        for prop in props:
            if prop in seen_props:
                print(f"Duplicate prop '{prop}' in '{name}'")
            seen_props.add(prop)

else:
    print("Could not find StyleSheet.create")
