<div>
Hello {{ name }} ::
{{each stories as story i}}
    <span >{{ story.name}}</span>
    <span style='font-size:0.5em;'> {{ story.body }}</span>
{{/each}}
{{if 33>3 }}
    true
{{/if}}
</div>
