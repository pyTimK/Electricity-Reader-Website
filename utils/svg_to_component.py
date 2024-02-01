import re
import sys
import os
import glob

width_value = 0

def convert_attribute(attribute, delimeter: str):
    parts = attribute.split(delimeter)
    return parts[0] + ''.join(part.capitalize() for part in parts[1:])

def convert_svg_to_react(svg_content, delimeter: str):

    regex_pattern = r'(\w+{}+\w+=)'.format(re.escape(delimeter))

    attributes_to_convert = re.findall(regex_pattern, svg_content)

    for attribute in set(attributes_to_convert):
        react_attribute = convert_attribute(attribute, delimeter)
        svg_content = svg_content.replace(attribute, react_attribute)

    return svg_content

def create_react_component(svg_content, component_name):
    return f"""
import {{ motion }} from "framer-motion";
import {{ MouseEventHandler }} from "react";

interface {component_name}Props {{
  onClick?: MouseEventHandler<SVGSVGElement>;
  size?: number;
}}

const {component_name}: React.FC<{component_name}Props> = ({{onClick, size={width_value}}}) => (
  {svg_content}
);

export default {component_name};
"""

def convert_to_motion_svg(react_svg_content):
    global width_value
    modified_string = react_svg_content.replace("<svg",
        "<motion.svg onClick={onClick} className='cursor-pointer' whileTap={{ scale: 0.8 }}").replace("</svg>", "</motion.svg>")

    #! GET WIDTH
    width_wild_pattern = r'width="(\d+)"'
    width_match = re.search(width_wild_pattern, modified_string)
    # Check if a match is found
    if width_match:
        # Access the matched group (XX in this case)
        width_value = width_match.group(1)
        # print(f'The width value is: {width_value}')
    else:
        print('No width match found')


    #! REPLACE WIDTH
    width_replacement_string = 'width={size}'
    modified_string = re.sub(width_wild_pattern, width_replacement_string, modified_string)
    
    height_wild_pattern = r'height="(\d+)"'
    height_replacement_string = ''
    modified_string = re.sub(height_wild_pattern, height_replacement_string, modified_string)
    
    return modified_string
    

def main():
    # if len(sys.argv) < 2:
    #     print("Please provide the SVG file name as an argument.")
    #     return

    directory_path = 'svg_temp/'

    # Get a list of all files in the directory (you can use patterns like '*.txt' to filter)
    file_list = glob.glob(os.path.join(directory_path, '*'))

    for svg_full_dir in file_list:
        # svg_file_name = sys.argv[1]
        # svg_full_dir = f"svg_temp/{svg_file_name}.svg"

        # If not svg, then continue
        if not svg_full_dir.endswith('.svg'):
            continue

        component_name, _ = os.path.splitext(os.path.basename(svg_full_dir))
        component_full_dir = f'components/custom/{component_name}.tsx'

        with open(svg_full_dir, 'r') as file:
            svg_content = file.read()

        react_svg_content = convert_svg_to_react(svg_content, '-')
        react_svg_content = convert_svg_to_react(svg_content, '-')
        react_svg_content = convert_svg_to_react(react_svg_content, ':')
        react_svg_content = convert_to_motion_svg(react_svg_content)
        react_component = create_react_component(react_svg_content, component_name)

        with open(component_full_dir, 'w') as file:
            file.write(react_component)

        try:
            os.remove(svg_full_dir)
        except OSError as e:
            print(f"Error: {e.filename} - {e.strerror}")

        print(f'{component_name}.tsx has been created successfully!')

if __name__ == "__main__":
    main()
