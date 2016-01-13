reStructuredText 入门
================================================

:origin: http://docspy3zh.readthedocs.org/en/latest/_sources/documenting/rest.txt

本节将简要介绍 reStructuredText (reST) 的基本概念与语法,
尽量使作者可以掌握足够信息并能够有效的编写文档.
因为 reST 设计的目标就是简单, 没有太多要求的标记语言, 所以不会花费很长时间.


段落
-----------------

在 reST 中, 段落是最基本的块. 段落是以一个或多个空行来分割.
就像在 Python 中一样, 缩进也是 reST 中的一个特色, 所以所有具有相同
缩进级别的行属于同一段落.

行内标记
--------------------------

标准的行内标记非常简单: 使用

* 一个星号: ``*text*`` 表强调 (斜体),
* 两个星号: ``**text**`` 表更强的强调 (粗体), 并且
* 反引号: ````text```` 表示代码实例.

如果星号或者反引号出现在文本中, 但可能与行内标记有冲突,
那么他们需要使用一个反斜杠进行转义.

注意这种标记的一些限制:

* 不能够嵌套,
* 里面的内容不能以空格开头或结尾: ``* test*`` 是错的,
* 在这些的周围必须要以非单词字符分割.
  使用一个反斜杠来转义一个空格就可以了: ``thisis\ *one*\ word``.

这些限制可能会在以后被去掉.

reST 同样允许自定义的 "interpreted text roles",
这就意味着围起来的文字可以以特殊的方式进行解释.
Sphinx 使用了这个提供了语义标记, 和交叉引用的标识符,
在下面的章节中将会提及. 一般的语法是 ``:rolename:`content```.


列表和引用
------------------------------

列表的标记是很自然的: 把星号放在每个段落的起始处,并使用合适的缩进.
同样, 这也适合有序的列表; 它们可以使用 ``#`` 符号进行自动编号:

::

   * This is a bulleted list.
   * It has two items, the second
     item uses two lines.

   1. This is a numbered list.
   2. It has two items too.

   #. This is a numbered list.
   #. It has two items too.


嵌套的列表是可以的, 但是注意它们必须要与父列表以空行分割:

::

   * this is
   * a list

     * with a nested list
     * and some subitems

   * and here the parent list continues

定义列表像下面这样定义:

::

   term (up to a line of text)
      Definition of the term, which must be indented

      and can even consist of multiple paragraphs

   next term
      Description.


引用的段落只需相对于周围的段落有缩进就可以了.


源代码
----------------------

源代码以一个特殊的标记 ``::`` 开始. 而且代码必须要缩进:

::

   This is a normal text paragraph. The next paragraph is a code sample::

      It is not processed in any way, except
      that the indentation is removed.

      It can span multiple lines.

   This is a normal text paragraph again.

处理 ``::`` 会很智能:

* 如果在段落中出现, 那么这个段落还是完整的保留下来.

* 如果前面有空格, 那么这个标记就被删除了.

* 如果前面不是空格, 那么就会被替换成一个冒号.

那么, 上面的那句例子就会成为如 "The next paragraph is a code sample:"
的样子.


超链接
---------------------

外部链接
^^^^^^^^^^^^^^^^^^^^^^^^^

使用 ```链接文字 <http:://target>`_`` 作为网页链接.
如果链接文字是一个网页的地址, 那么你就不需要特殊的标记了,
解析器会帮助你找到链接和邮件地址.

内部链接
^^^^^^^^^^^^^^^^^^^^^^^^^^

内部链接可以使用 reST 的特殊标记, 参考特殊标记的那节, *:ref:`doc-ref-role`.*


章节
----------------

章节的标题使用在标题下放置一个字符来创建, 而此字符至少要和文本一样长:

::

   =================
   This is a heading
   =================

一般来说, 没有非常明确的要求需要使用哪种符号来指明不同级别的标题.
但是, 对于 Python 文档来说, 我们使用这种约定:

* ``#`` with overline, for parts
* ``*`` with overline, for chapters
* ``=``, for sections
* ``-``, for subsections
* ``^``, for subsubsections
* ``"``, for paragraphs


显式的标记
---------------------------

在 reST 中, "Explicit markup" 用于那些需要额外处理的构造,
比如脚注, 特殊高亮的段落, 注释, 和通用的指示符.

一个显式的标记块一般以 ``..`` 开始, 然后后面跟着空白,
并且以与其相同级别的缩进表示结束. (当然,
此处我们还需要一个空白行来分隔标记块与正常的段落.
这可能听起来有点复杂, 但是当你写它的时候, 它就变得非常直观.)


指示符
-------------------

一个指示符就是一个普通的显式标记块. 它是一个 reST 可扩展的部分,
在 Sphinx 中使用了大量的这种标记.

最基本的, 一个指示符包含一个名字, 参数, 选项和内容.
(请记住这个术语, 它将在下一章描述) 请看下面的例子,

::

   .. function:: foo(x)
                 foo(y, z)
      :bar: no

      Return a line of text input from the user.

``function`` 是一个指示符的名字. 此处给了两个参数 (即前面两行剩下的),
和选项 ``bar`` (就像你看到的, 选项是紧跟参数的, 并且通过冒号指明).

而后面的内容, 则是在一个空白行之后, 并且相对于指示符的开头有一定的缩进.


脚注
------------------

对于脚注, 使用 ``[#]_`` 来标记脚注的位置, 并增加一个脚注的主体在文档的后面,
像这样:

::

   Lorem ipsum [#]_ dolor sit amet ... [#]_

   .. rubric:: Footnotes

   .. [#] Text of the first footnote.
   .. [#] Text of the second footnote.

你可以使用显式的数字.


注释
--------------

每一个显式的标记块如果没有一个合法的标记构造就会被认为是注释.


代码的编码
------------------------------

为了以最简单的方式包含一些特殊字符, 我们将使用 Unicode 字符,
但需要指明一种编码方式:

所有的 Python 文档的源代码都将是 UTF-8 的编码,
而生成的 HTML 文档也将是这种编码.


Gotchas
-------

There are some problems one commonly runs into while authoring reST documents:

* **Separation of inline markup:** As said above, inline markup spans must be
  separated from the surrounding text by non-word characters, you have to use
  an escaped space to get around that.
