(function($){
    $(document).ready(function(){
        $('.click').bind('click',function(){
            console.log('click on object: '+this.nodeName);
        });
        $('.keypress').bind('keypress',function(){
            console.log('focus on object: '+this.nodeName);
        });
        $('.focus').bind('focus',function(){
            console.log('focus on object: '+this.nodeName);
        });
        $('.ajax').bind('click.ajax',function(){
            console.log('loading ajax on object: '+this.nodeName);
            $.get($(this).attr('href'), function(html){
                $('body').append(html);
            });
            return false;
        });
        var eventi = $('.well').children().stalk('click');
        console.log(eventi);
    });
})(jQuery);