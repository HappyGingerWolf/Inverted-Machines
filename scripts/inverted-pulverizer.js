const invertedPulverizer = extendContent(GenericCrafter, "inverted-pulverizer", {

	draw(tile){

    Draw.rect(this.region, tile.drawx(), tile.drawy());

    Draw.rect(Core.atlas.find(this.name + "-rotator"), tile.drawx(), tile.drawy(), tile.entity.totalProgress * -2);
	},

	generateIcons: function(){
		return [
			Core.atlas.find(this.name),
			Core.atlas.find(this.name + "-rotator"),
		];
	},
	
});

invertedPulverizer.layer = Layer.turret;;
