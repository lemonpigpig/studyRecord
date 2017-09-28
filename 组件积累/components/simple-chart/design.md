
## 目标结果

![](img.png)

## 实现点
- 用canvas实现

## 分析输入数据:
- solt:
  - header
  - footer
  - pointer

- porps:
  - height<br>
    为空，则不显示

  - width<br>
    为空，则不显示

  - vauleList<br>
    必须为数组，非数组不显示，可以接受空数组

  - direction<br>
    接受两个值：V和H ，默认为H<br>
    H:从左至右<br>
    V:从下到上

  - options
    - paddingLeft<br>
      默认为0
    - paddingRight<br>
      默认为0
    - paddingTop<br>
      默认为0
    - paddingBottom<br>
      默认为0
    - headerAlign<br>
      接受三个值:right,center,left,默认为true<br>
      默认居中
    - footerAlign<br>
      接受三个值:right,center,left,默认为true<br>
      如果为空，默认不显示
    - startBgColor<br>
      直接收类似"#ffeedd"这种16进制<br>
      如果为空或不合法，就不显示背景色（从左到右，或者从下到上）
    - endBgColor<br>
      直接收类似"#ffeedd"这种16进制<br>
      如果为空或不合法，就不显示背景色（从左到右，或者从下到上）
    - gradient<br>

    - pointStyle<br>
      接受一个值：normal，默认normal
