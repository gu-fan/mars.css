<div>Hello <%- name %> ::
<% _.forEach(stories, function(story) { %>
    <span><%- story.name %></span>
    <span style='font-size:0.5em;'> <%- story.body %></span>
<% }); %>
<% if (3 == 3) { %>
    true
<% } %>
</div>
