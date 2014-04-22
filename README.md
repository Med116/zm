zm
==

##Zero Markup JS templating function

This function allows you to write HTML in javascript.

## Example

    var div = new Zm.Div();
    div.addContent("this is a div").addClass("no_wrap blue funny_class");
    // this will print html string
    var html = div.print();
    console.log(html);
    
## Output of example

    <div class=" no_wrap blue funny_class"  >this is a div</div> 
    
    





