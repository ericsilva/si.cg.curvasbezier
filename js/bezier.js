/**
 * Bezier
 */
var Bezier = {

	/**
	 * Posicao atual do ponto bezier
	 */
	position : undefined,

	/**
	 * Distancia entre o ultimo ponto e o proximo a ser desenhado
	 */
	distance : undefined,

	/**
	 * Distancia padrao entre os pontos
	 */
	distanceDefault : 0.01,
	
	/**
	* Pontos no plano
	*/
	p1 : undefined,
	p2 : undefined,
	p3 : undefined,
	p4 : undefined,

	/**
	 * Cria uma coordenada no plano
	 * 
	 * @param x
	 * @param y
	 */
	makeCoord : function(x, y) {
		x = (isNaN(x)) ? 0 : x;
		y = (isNaN(y)) ? 0 : y;

		return {
			x : x,
			y : y
		};
	},

	/**
	 * Equacoes para calcular as funcoes Bezier
	 */
	bezierOne : function(d) {
		return (d * d * d);
	},

	bezierTwo : function(d) {
		return (3 * d * d * (1 - d));
	},

	bezierThree : function(d) {
		return (3 * d * (1 - d) * (1 - d));
	},

	bezierFour : function(d) {
		return ((1 - d) * (1 - d) * (1 - d));
	},

	/**
	 * Calculando o ponto Bezier
	 */
	bezierPoint : function(coord1, coord2, coord3, coord4, distance) {
		var p = Bezier.makeCoord();

		p.x = coord1.x * Bezier.bezierOne(distance) + coord2.x
				* Bezier.bezierTwo(distance) + coord3.x
				* Bezier.bezierThree(distance) + coord4.x
				* Bezier.bezierFour(distance);

		p.y = coord1.y * Bezier.bezierOne(distance) + coord2.y
				* Bezier.bezierTwo(distance) + coord3.y
				* Bezier.bezierThree(distance) + coord4.y
				* Bezier.bezierFour(distance);

		return p;
	},

	begin : function() {
		$("#curve").html("");
		
		Bezier.p1 = Bezier.makeCoord($("input[name='ponto[a][x]']").val(),
				$("input[name='ponto[a][y]']").val());

		Bezier.p2 = Bezier.makeCoord($("input[name='ponto[b][x]']").val(),
				$("input[name='ponto[b][y]']").val());

		Bezier.p3 = Bezier.makeCoord($("input[name='ponto[c][x]']").val(),
				$("input[name='ponto[c][y]']").val());

		Bezier.p4 = Bezier.makeCoord($("input[name='ponto[d][x]']").val(),
				$("input[name='ponto[d][y]']").val());
				
		var html = "<div class='dot' style='"
				+ "background-color: red;"
				+ "top: "  + Bezier.p1.y + "px; "
				+ "left: " + Bezier.p1.x + "px;'>A</div>"
				
				+ "<div class='dot' style='"
				+ "background-color: red;"
				+ "top: "  + Bezier.p2.y + "px; "
				+ "left: " + Bezier.p2.x + "px;'>B</div>"
				
				+ "<div class='dot' style='"
				+ "background-color: red;"
				+ "top: "  + Bezier.p3.y + "px; "
				+ "left: " + Bezier.p3.x + "px;'>C</div>"
				
				+ "<div class='dot' style='"
				+ "background-color: red;"
				+ "top: "  + Bezier.p4.y + "px; "
				+ "left: " + Bezier.p4.x + "px;'>D</div>";
		
		$("#curve").html($("#curve").html() + html);
				
		Bezier.distance = Bezier.distanceDefault;
		Bezier.draw();
	},

	draw : function() {

		var html = "";

		Bezier.position = Bezier.bezierPoint(Bezier.p1, Bezier.p2, Bezier.p3, Bezier.p4, Bezier.distance);

		var html = "<div class='dot' style='"
				+ "top: "  + Math.round(Bezier.position.y) + "px; "
				+ "left: " + Math.round(Bezier.position.x) + "px;'></div>";
		
		$("#curve").html($("#curve").html() + html);

		// Proxima posicao
		Bezier.distance += Bezier.distanceDefault;
		Bezier.position = Bezier.bezierPoint(Bezier.p1, Bezier.p2, Bezier.p3, Bezier.p4, Bezier.distance);
		
		if(Bezier.distance < 1) {
			setTimeout("Bezier.draw();", 20);
		}
	}
};