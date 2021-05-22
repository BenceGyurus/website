import string
import random
users = {}

def control_Users(id, file_Type, data, host_Name):
    global users
    return_Message = ""
    try: 
        data = data.decode("utf-8")
        print(data)
    except:
        pass
    if file_Type == "/add_Css_File":
            users[id][1] = data
            print(users[id])
            random_Name = save_File(users[id], id)
            print(random_Name)
            return_Message = f"{host_Name}/users_Websites/{random_Name}.html"
    if file_Type == "/new_Html_File":
        users[id] = [data, ""]
        return_Message = "get_Css"
    return return_Message

def save_File(file, name):
    global users
    html_File_Datas = ""
    file_Name = ""
    list_Letters = list(string.ascii_letters)
    for i in range(0, 50):
        num = random.randint(0,1)
        if num == 0:
            file_Name += f"{random.randint(0,9)}"
        elif num == 1:
            file_Name += f"{list_Letters[random.randint(0, len(list_Letters)-1)]}"
    print(file_Name)
    html_File_Datas = f"""<!DOCTYPE html>
    <html lang="hu">
    <head>
    <meta charset="UTF-8">
    <title>WEB generátor</title>
    <link rel="stylesheet" href="{file_Name}.css">
    </head>
    <body>
     {file[0]}
    </body>
    </html>"""
    with open(f"users_Websites/{file_Name}.html", "w", encoding = "utf-8") as filed:
        filed.write(html_File_Datas)
    with open(f"users_Websites/{file_Name}.css", "w", encoding = "utf-8") as filed:
        filed.write(file[1])
    print(f"file[1]: {file[1]}")
    del users[name]
    return file_Name

def control_File_Datas(file):
    pass