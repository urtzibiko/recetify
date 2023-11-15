let twigFunctions = [
  {
    name: "svgSprite",
    func: function(id, iconClass){
      if(typeof iconClass=='undefined'){
        iconClass='';
      }
      var output = '<svg class="icon ' + iconClass +' svg--'+id+'-dims' + '">';
      output += '<use xlink:href="/svg/sprite/sprite.svg#';
      output += id;
      output += '"></use></svg>';
      return output;
    }
  },
  {
    name: "activeMenu",
    func: function(target, current){
      if(target === current){
        return 'active';
      }
      return '';
    }

  },
  {
    name: "responsiveImage",
    func: function(imageName, alt){
      let output = '<img srcset="';
      output += imageName;
      output += '-320w.jpg 320w,';
      output += imageName;
      output += '480w.jpg 480w,';
      output += imageName;
      output += '.jpg 800w"sizes="(max-width: 320px) 280px,(max-width: 480px) 440px,800px" src="';
      output += imageName;
      output += '-800w';
      output += '.jpg" alt="';
      output += alt;
      output += '">';
      return output;
    }
  }
];

module.exports = twigFunctions;
