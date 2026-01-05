# -*- coding: utf-8 -*-
import os

# 搜索目录下的html文件
# 指定目录
strSpecifiedDirPath = os.getcwd()

m_obj = {}


def get_file_path(path, obj):
    list = []
    file_or_dir = os.listdir(path)
    for file_dir in file_or_dir:
        file_or_dir_path = os.path.join(path, file_dir)
        # 判断该路径是不是路径，如果是，递归调用
        if os.path.isdir(file_or_dir_path):
            list.append(file_dir)
            obj[file_dir] = {}
            # print('Path: ' + file_dir)
            # 递归
            get_file_path(file_or_dir_path, obj[file_dir])
        else:
            # print('File: ' + file_dir)
            if os.path.splitext(file_dir)[1] == '.html':
                obj[file_dir] = ''


# 添加多级目录方法
def add_children():
    def add_child(obj, value):
        obj[value] = {}
        return obj[value]

    list = [21, 22, 3]
    m_obj = {}
    m_cache = m_obj

    for val in list:
        m_cache = add_child(m_cache, val)
    print(m_obj)


# 主函数
if __name__ == "__main__":
    # add_children()
    get_file_path(strSpecifiedDirPath, m_obj)
    print(m_obj)
