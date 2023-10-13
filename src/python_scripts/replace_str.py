import re
from sys import argv
from base64 import b64decode

class Wrapper:
    
    def __init__(self, func):
        self.k = 0

        groups_func = re.sub(r'\$\d+', self.change_groups, func)
        self.func = eval('lambda x, y, k: ' + groups_func)

    def change_groups(self, txt):
        txt = txt.group()
        return "y[" + txt.replace("$", "") + "]"

    # wrapper to always return a string
    # and to increment the counter    
    def wrapperStr(self, txt: re.Match[str]):
        value = self.func(txt.group(), txt, self.k)
        self.k += 1
        if not isinstance(value, str):
            return str(value)
        return value
    
def replace_infile_str(file_path, reg, func):
    try:
        if not isinstance(reg, str):
            raise TypeError("Regex must be of type str not " + str(type(reg)))
        # read file and replace
        with open(file_path, "r") as file:
            wrap = Wrapper(func)
            regex = re.compile(reg)
            rep = re.sub(regex, wrap.wrapperStr, file.read())
    except Exception as e:
        return e
    #if no issue, write in file
    with open(file_path, "w") as file:
        file.write(rep)
    return "Done !"


if __name__ == "__main__":
    print(replace_infile_str(argv[1], b64decode(argv[2]).decode(), b64decode(argv[3]).decode()))

