import os
def open_File(filename, ip):
    filename = filename.split("?")[0]
    new_Filename = "error.html"
    response = 404
    datas = b"ERROR"
    extension = ""
    file_Name_With_Out_Path = filename.split("/")[len(filename.split("/"))-1]
    if file_Name_With_Out_Path != "error.css":
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
        if new_Filename:
            try:
                extensions = []
                error = False
                with open("extensions.txt", "r", encoding = "utf-8") as file:
                    new_Extension = file.readline().strip()
                    while new_Extension:
                        extensions.append(new_Extension)
                        new_Extension = file.readline().strip()
                for i in extensions:
                    if i == extension:
                        new_Filename = "error.html"
                        error = True
                else:
                    if new_Filename != "number_Of_Files":
                        with open(new_Filename, "rb") as file:
                            datas = file.read()
                            if not error:
                                response = 200
                    else:
                        datas = str(len(os.listdir())).encode("utf-8")
                        response = 200
            except:
                with open("error.html", "rb") as file:
                    datas = file.read()
    elif file_Name_With_Out_Path == "error.css":
        with open("error.css", "rb") as file:
            extension = ".css"
            response = 200
            datas = file.read()
    return datas, extension, response
