const invertedSeparator = extendContent(GenericCrafter, "inverted-separator", {

	draw(tile){

    Draw.rect(this.region, tile.drawx(), tile.drawy());

    Draw.rect(Core.atlas.find(this.name + "-spinner"), tile.drawx(), tile.drawy(), tile.entity.totalProgress * -2);
	},

	generateIcons: function(){
		return [
			Core.atlas.find(this.name),
			Core.atlas.find(this.name + "-spinner"),
		];
	},
	
});

invertedSeparator.layer = Layer.turret;;
