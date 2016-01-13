<div>
Hello {{ name }} ::
{% for story in stories %}
    <span >{{ story.name}}</span>
    <span style='font-size:0.5em;'> {{ story.body }}</span>
{% endfor %}
{% if 33>3 %}
    true
{% endif %}
</div>
