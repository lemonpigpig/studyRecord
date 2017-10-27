# print 格式化打印
age = 25
name = 'scarllet'

print('{0} was {1} years old when he wrote this book'.format(name, age))
print('{} was {} years old when he wrote this book'.format(name, age))
# 对于浮点数 ‘0.333’ 保留小数点后俩位
print('{0:.2f}'.format(1.0/3))
# 使用下划线填充文本，并保持文字处于中间位置
# 使用（^）定义‘___hello___’字符串长度为 11
print('{0:_^11}'.format('hello'))
# 基于关键词输出 ‘swapeer wrote a byte of python’
print('{name} wrote {book}'.format(name='swapeer', book='a byte of python'))

# print总是会以一个不可见的“新一行”字符（\n）结尾，因此重复调用print将会在相互独立的一行中分别打印。为防止打印过程中
# 出现这一换行符，你可以通过end指定其应该一空白结尾：
print('a')
print('b')

# cannot work why
print('c', end='')
print('d', end='****')

# 转移序列

print('this is my \
good friend')
print('this is my\ngood friend')

# 原始字符串 r或R来制定一个原始（raw）字符串
print(r"newlines are indicated by \n")

