import json

def load_json(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        return json.load(file)

def compare_and_extract_unique(file1, file2, output_file):
    # Load JSON from files
    data1 = load_json(file1)
    data2 = load_json(file2)
    
    # Convert lists of dictionaries to sets of frozensets for comparison
    set1 = {frozenset(obj.items()) for obj in data1}
    set2 = {frozenset(obj.items()) for obj in data2}
    
    # Find unique objects in data1
    unique_objects = [dict(obj) for obj in (set1 - set2)]
    
    # Write unique objects to output file
    with open(output_file, 'w', encoding='utf-8') as outfile:
        json.dump(unique_objects, outfile, indent=4)

if __name__ == "__main__":
    file1_path = r'F:\MongoDb\mongo\admincountries.json'  # Path to the first JSON file
    file2_path = r'F:\MongoDb\mongo\countries.json'  # Path to the second JSON file
    output_file_path = 'unique_objects.json'  # Path to the output JSON file
    
    compare_and_extract_unique(file1_path, file2_path, output_file_path)
