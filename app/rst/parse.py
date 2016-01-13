# -*- coding: utf-8 -*- 
# print "Latin-1:", "unicode über alles!".decode('utf-8').encode('latin-1')
# print "Utf-8:", "unicode über alles!".decode('utf-8').encode('utf-8')
# print "Windows:", "unicode über alles!".decode('utf-8').encode('cp1252')
import sys, os
reload(sys)
sys.setdefaultencoding("utf-8")

from rst import html_body
import codecs

# USAGE: 
# python parse.py doc/index.rst
if len(sys.argv) > 1:
    f = sys.argv[1]
else:
    print 'Error:no file'

if os.path.isfile(f):
    with codecs.open(f,'r', 'utf-8') as rst:
        d =  rst.read()
        # XXX: output to stdout will raise a error if not set default encoding
        # http://stackoverflow.com/questions/3828723/why-we-need-sys-setdefaultencodingutf-8-in-a-py-script
        # print d.decode('utf8')
        print html_body(d.decode('utf8'))
else:
    print 'Error:not a valid file'
