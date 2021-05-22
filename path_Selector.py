import os
def open_File(filename, ip):
    filename = filename.split("?")[0]
    print(filename)
    new_Filename = "error.html"
    response = 404
    datas = b"ERROR"
    if filename == "/":
        filename = "main.html"
    if filename:
        new_Filename = ""
        splited = filename.split("/")
        for i in filename.split("/"):
            if i != filename.split("/")[0] and splited[len(splited)-1] != i:
                new_Filename += f"{i}/"
            elif splited[len(splited)-1] == i:
                new_Filename += i
    extension = filename.split(".")[len(filename.split("."))-1]
    print(new_Filename)
    print(extension)
    if new_Filename:
        try:
            if extension == "py" or extension == "txt" or extension == "db":
                new_Filename = "error.html"
            else:
                if new_Filename != "number_Of_Files":
                    with open(new_Filename, "rb") as file:
                        datas = file.read()
                        response = 200
                else:
                    print(os.listdir())
                    datas = str(len(os.listdir())).encode("utf-8")
                    print(datas)
                    response = 200
        except:
            with open("error.html", "rb") as file:
                datas = file.read()
    return datas, extension, response
