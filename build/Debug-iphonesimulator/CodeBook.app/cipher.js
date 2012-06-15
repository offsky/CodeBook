//View Helper functions
function encipher(cipher) {
	$('#ciphertext').val('Enciphering...');
	$('#ciphertext').addClass("thinking");
	
	setTimeout(function() {
		$('#ciphertext').removeClass("thinking");
		$('#ciphertext').val(cipher);
	},500);	
}

function decipher(plain) {
	$('#plaintext').val('Deciphering...');
	$('#plaintext').addClass("thinking");
	
	setTimeout(function() {
		$('#plaintext').removeClass("thinking");
		$('#plaintext').val(plain);
	},500);	
}

function validateNumber (evt) {
	var keyCode = evt.which ? evt.which : evt.keyCode;
	return keyCode >= 45 && keyCode <= 57; 
}

//inputs of class "number" will be forced to be a number
jQuery(function () {
    jQuery("input.number").keydown(function(event) {  
          // Allow: backspace, delete, tab and escape Ctrl+A
        if ( event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || 
            (event.keyCode == 65 && event.ctrlKey === true) ||  // Allow: home, end, left, right
            (event.keyCode >= 35 && event.keyCode <= 39)) { // let it happen, don't do anything
                 return;
        } else {
            // Ensure that it is a number and stop the keypress
            if ( event.shiftKey|| (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 ) ) {
       			event.preventDefault(); 
            }
        }
    });
});
   
//Ciphers
function caesar_encode(plainText,shift) {
	var let = "";
	var encoded = "";
	shift=parseInt(shift);
	if(shift>26) shift=26;
	for (var i =0; i < plainText.length; i++) {
		let = plainText.charCodeAt(i);
		
		if (let >= 65  && let <= 90)
		{
			temp = let + shift;
			temp = (temp > 90) ? temp-26 : temp;
		}
		else if (let >= 97 && let <= 122)
		{
			temp = let + shift;
			temp = (temp > 122) ? temp-26 : temp;
		}
		else
			temp = let;
		
		encoded += String.fromCharCode (temp); 
	}
	
	return encoded;
}

function caesar_decode(cipherText,shift) {
	shift=parseInt(shift);
	if(shift>26) shift=26;
	shift = 26 - shift;
	return caesar_encode(cipherText, shift);
}

function atbash_encode(plainText) {
	var encoded = "";
	var let = 0;
	for (var i =0; i < plainText.length; i++)
	{
		let = plainText.charCodeAt(i);
		if (let >= 65  && let <= 90)
		{
			temp = 155 - let;
		}
		else if (let >= 97 && let <= 122)
		{
			temp = 219-let;
		}
		else
			temp = let;
		
		encoded += String.fromCharCode (temp); 	
	}
	return encoded;
}

function atbash_decode(cipherText) {
	return atbash_encode(cipherText);
}

function generate_ka(keyword) {
	var sub = new Array();
	for (var i = 0; i < keyword.length; i++)
	{
		if (sub.indexOf(keyword.charAt(i)) == -1)
			sub.push(keyword.charAt(i));
	}
	for (var i = 97; i < 122; i++)
	{
		if (sub.indexOf (String.fromCharCode(i)) == -1)
			sub.push(String.fromCharCode(i));
	}
	return sub;
}

function keyword_encode(plainText,keyword) {
	var encoded = "";
	
	plainText = plainText.toLowerCase().replace(/[^a-z ]+/g, "");
	
	keyword = keyword.toLowerCase().replace(/[^a-z]/, "");;

	var ka = generate_ka(keyword);
	
	for (var i =0;i<plainText.length;i++)
	{
		pos = plainText.charCodeAt(i) - 97;
		
		if (pos>=0 && pos < 27 && ka[pos] !== undefined)
			encoded += ka[pos];
		else
			encoded += plainText.charAt(i);
	}
	return encoded;
}

function keyword_decode(cipherText,keyword) {
	var decoded = "";
	keyword = keyword.toLowerCase().replace(/[^a-z]/, "");
	cipherText = cipherText.toLowerCase().replace(/[^a-z ]+/g, '');
	var ka = generate_ka(keyword);
	ka = array_flip(ka);
	
	for (var i = 0; i < cipherText.length; i++)
	{
		pos = cipherText.charAt(i);
	
		decoded += (ka[pos] !== undefined) ? String.fromCharCode(parseInt(ka[pos]) + 97) : cipherText.charAt(i);
	}
	return decoded;
}

function polybiusSquare_encode(plainText) {
	var encoded = "";
	
	plainText = plainText.toLowerCase().replace(/[ \t]+$/, '').replace(/[^a-z ]+/g, '');
	var poly = new Array();
	poly['a'] = "11";
	poly['b'] = "12";
	poly['c'] = "13";
	poly['d'] = "14";
	poly['e'] = "15";
	poly['f'] = "21";
	poly['g'] = "22";
	poly['h'] = "23";
	poly['j'] = "24";
	poly['i'] = "24";
	poly['k'] = "25";
	poly['l'] = "31";
	poly['m'] = "32";
	poly['n'] = "33";
	poly['o'] = "34";
	poly['p'] = "35";
	poly['q'] = "41";
	poly['r'] = "42";
	poly['s'] = "43";
	poly['t'] = "44";
	poly['u'] = "45";
	poly['v'] = "51";
	poly['w'] = "52";
	poly['x'] = "53";
	poly['y'] = "54";
	poly['z'] = "55";
	poly[' '] = " ";

	for (var i=0; i< plainText.length; i++)
		encoded += poly[plainText.charAt(i)];
			
	return encoded;
}

function polybiusSquare_decode(cipherText) {
	var poly = new Array();
	poly['a'] = "11";
	poly['b'] = "12";
	poly['c'] = "13";
	poly['d'] = "14";
	poly['e'] = "15";
	poly['f'] = "21";
	poly['g'] = "22";
	poly['h'] = "23";
	poly['j'] = "24";
	poly['i'] = "24";
	poly['k'] = "25";
	poly['l'] = "31";
	poly['m'] = "32";
	poly['n'] = "33";
	poly['o'] = "34";
	poly['p'] = "35";
	poly['q'] = "41";
	poly['r'] = "42";
	poly['s'] = "43";
	poly['t'] = "44";
	poly['u'] = "45";
	poly['v'] = "51";
	poly['w'] = "52";
	poly['x'] = "53";
	poly['y'] = "54";
	poly['z'] = "55";
	poly[' '] = " ";
	
	cipherText = cipherText.replace(/[^0-9 ]+/g, '');
	var decoded = "";
	var word = cipherText.split(" ");
	poly = array_flip(poly);
	
	for (var i = 0; i < word.length; i++)
	{
		for (var l = 0; l < word[i].length; l += 2)
		{
			let = word[i].substr(l, 2);
			
			if (let.replace(/\s/g,"") != "" && poly[let] !== undefined)
				decoded += poly[let];
			else
				decoded += " ";
		}
		decoded += " ";
	}
	return decoded.toLowerCase();
}

function railFence_encode(plainText,rails) {
	var encoded = "";
	
	rails = (rails === undefined) ? 3 : parseInt(rails);
	
	plainText = plainText.replace(/[^a-zA-Z0-9]+/g, "");
	var len = Math.ceil (plainText.length / rails);
	var group = 0;
	
	for (var rail = 0; rail < rails; rail++)
	{
		for (var i = rail; i < len * rails;  i += rails)
		{
			if (group >= 5)
			{
				encoded += " ";
				group = 0;
			}
			group++;
			if (plainText.charAt(i).replace(/\s/g,"") != "")
				encoded += plainText.charAt(i);
			else
				encoded += String.fromCharCode(65+Math.floor(Math.random()*25));
		}
	}
	
	encoded = encoded.toUpperCase();

	return encoded;
}

function railFence_decode(cipherText,rails) {

	var decoded = "";
	cipherText = cipherText.replace(/[\s ]+/g, "");
	rails = (rails === undefined) ? 3 : parseInt(rails);
	
	var remaining = cipherText;
	var left = rails;
	var rail = new Array();
	for (var r=0; r<rails; r++)
	{
		len = Math.ceil(remaining.length/left);
		rail[r] = remaining.substr(0,len);
		remaining = remaining.substr(len);
		left--;
	}
	
	for (var i =0; i < rail[0].length; i++)
	{
		for (var r = 0; r< rails; r++)
		{
			if (rail[r] !== undefined && !empty(rail[r].charAt(i))) 
				decoded += rail[r].charAt(i);
		}
	}
			
	return decoded;
}

function columnarTransposition_encode(plainText,keyword,irregular) {
	keyword = keyword.toUpperCase().replace(/[^A-Z]/g, "");
	plainText = plainText.toUpperCase().replace(/[^A-Z]/g, "");
	keyword = (keyword === undefined || keyword == "") ? "ZEBRAS" : keyword;
	plainText = (plainText === undefined || plainText == "") ? "WEAREDISCOVEREDFLEEATONCE" : plainText;

	var cols = keyword.length;
	var ord = new Array();
	for (var i =0; i<cols; i++)
		ord[i] = [i, keyword.charCodeAt(i)];

	ord.sort(function(comparatorA, comparatorB) {
		var ordA = comparatorA[1], ordB = comparatorB[1]
		if (ordA > ordB)     return 1;
		if (ordA < ordB)     return -1;
		if (ordA === ordB)   return 0;
	});

	var encoded = "";
	if (irregular == false){
		while ((plainText.length%cols) != 0) 
			plainText += String.fromCharCode(65+Math.floor(Math.random()*25));
	}
	for(var x = 0; x < ord.length; x++) 
	{
		col = ord[x][0];
		col = parseInt(col);
		for (var i = col; i < plainText.length; i+=cols)
			encoded += plainText.charAt(i);
	}
	return encoded;
	
}

function columnarTransposition_decode(cipherText,keyword,irregular) {
	keyword = keyword.toUpperCase().replace(/[^A-Z]/g, "");
	cipherText = cipherText.toUpperCase().replace(/[^A-Z]/g, "");
	keyword = (keyword === undefined || keyword == "") ? "ZEBRAS" : keyword;
	cipherText = (cipherText === undefined || cipherText == "") ? "EVLNAACDTJESEAIROFOFDEECBWIREE" : cipherText;
	
	var cols = keyword.length;
	var ord = new Array();
	for (var i =0; i<cols; i++)
		ord[i] = [i, keyword.charCodeAt(i)]; 

	ord.sort(function(comparatorA, comparatorB) {
		var ordA = comparatorA[1], ordB = comparatorB[1]
		if (ordA > ordB)     return 1;
		if (ordA < ordB)     return -1;
		if (ordA === ordB)   return 0;
	});
	
	var rows = Math.ceil(cipherText.length/cols);
	var longcols = cipherText.length % cols;
	if (longcols == 0) longcols = cols;
	var pos = 0;
	var grid = new Array();

	for(var x = 0; x < ord.length; x++)
	{
		col = ord[x][0];
		if (longcols <= col)
		{
			grid[col] = cipherText.substr(pos,rows-1);
			pos += rows - 1;
		}
		else
		{
			grid[col] = cipherText.substr(pos, rows);
			pos += rows;
		}
		
	}
	var decoded = "";
	for (var r = 0; r < rows; r++)
	{
		for (var c = 0; c < cols; c++)
		{
			if (grid[c].charAt(r) !== undefined)
				decoded += grid[c].charAt(r);
		}
	}
	return decoded;
	
}

function pf_generate_table(keyword, method) {
	var sub = new Array();
	for (var i = 0; i < keyword.length; i++)
	{
		if (sub.indexOf(keyword.charAt(i)) == -1)
			sub.push(keyword.charAt(i));
	}
	for (var i = 97; i <= 122; i++)
	{
		if (sub.indexOf(String.fromCharCode(i)) == -1 && i != method)
			sub.push(String.fromCharCode(i));
	}
	return sub;
}

function playfair_encode(plainText,keyword,method) {

	keyword = keyword.toLowerCase().replace(/[^a-z]/g, "");
	plainText = plainText.toLowerCase().replace(/[^a-z]/g, "");
	keyword = (keyword === undefined || keyword == "") ? "keyword" : keyword;
	plainText = (plainText === undefined || plainText == "") ? "thisisasecretmessage" : plainText;

	method = (parseInt(method) != 106 && parseInt(method) != 113) ? 113 : parseInt(method);
	
	plainText = (method == 113) ? plainText.replace("q","") : plainText.replace("j","i");
		
	var sub = pf_generate_table(keyword, method);
	var rev = array_flip(sub);
	
	var encoded = "";
	
	var temp = plainText;
	plainText = "";

	for (var i = 0; i < temp.length; i+=2)
	{
		if (temp.charAt(i) == temp.charAt(i+1))
		{
			plainText += temp.charAt(i) + "x ";
			temp = temp.substr(0, i+1) + "x" + temp.substr(i+1);
		}
		else if(temp.charAt(i+1))
		{
			plainText += temp.charAt(i) + temp.charAt(i+1) + " ";
		}
		else
		{
			plainText += temp.charAt(i) + "x";
		}
	}
	plainText = plainText.trim();
	var pairs = plainText.split(" ");
	
	var a = 0;
	var b = 0;var count = 0;

	for (var i =0; i<pairs.length;i++)
	{
		a = rev[pairs[i].charAt(0)];
		b = rev[pairs[i].charAt(1)];
		
	//	a = (a === undefined) ? 0 : a;
		//b = (b === undefined) ? 0 : b;
		
		a = parseInt(a);
		b = parseInt(b);

		if (a < 5 && b < 5)
		{
			if (a == 4) a = 0; else a++;
			if (b == 4) b = 0; else b++;
		} else if (a>=5 && b>=5 && a<10 && b<10) { //both on row 2
			if(a==9) a=5; else a++;
			if(b==9) b=5; else b++;
		} else if(a>=10 && b>=10 && a<15 && b<15) { //both on row 3
			if(a==14) a=10; else a++;
			if(b==14) b=10; else b++;
		} else if(a>=15 && b>=15 && a<20 && b<20) { //both on row 4
			if(a==19) a=15; else a++;
			if(b==19) b=15; else b++;
		} else if(a>=20 && b>=20 && a<25 && b<25) { //both on row 5
			if(a==24) a=20; else a++;
			if(b==24) b=20; else b++;
		} else if(a%5==0 && b%5==0) { //both on col 1
			if(a==20) a=0; else a+=5;
			if(b==20) b=0; else b+=5;
		} else if(a%5==1 && b%5==1) { //both on col 2
			if(a==21) a=1; else a+=5;
			if(b==21) b=1; else b+=5;
		} else if(a%5==2 && b%5==2) { //both on col 3
			if(a==22) a=2; else a+=5;
			if(b==22) b=2; else b+=5;
		} else if(a%5==3 && b%5==3) { //both on col 4
			if(a==23) a=3; else a+=5;
			if(b==23) b=3; else b+=5;
		} else if(a%5==4 && b%5==4) { //both on col 5
			if(a==24) a=4; else a+=5;
			if(b==24) b=4; else b+=5;
		} else { //rectangle
			cola = a%5;
			colb = b%5;
			a+=parseInt(colb)-parseInt(cola);
			b+=parseInt(cola)-parseInt(colb);
			
		}
		encoded += sub[a] + sub[b] + " ";
	}
	return encoded;
	
}

function playfair_decode(cipherText,keyword,method) {
	keyword = keyword.toLowerCase().replace(/[^a-z]/g, "");
	cipherText = cipherText.toLowerCase().replace(/[^a-z]/g, "");
	keyword = (keyword === undefined || keyword == "") ? "keyword" : keyword;
	cipherText = (cipherText === undefined || cipherText == "") ? "vf jp jp cn od dk ul om nc md" : cipherText;
	
	method = (parseInt(method) != 106 && parseInt(method) != 113) ? 113 : parseInt(method);
	
	cipherText = (method == 113) ? cipherText.replace("q","") : cipherText.replace("j","i");
		
	var sub = pf_generate_table(keyword, method);
	var rev = array_flip(sub);
	
	var decoded = "";
	temp = cipherText;
	cipherText = "";
	for (var i =0; i < temp.length; i+=2)
	{
		cipherText += temp.charAt(i)+temp.charAt(i+1)+" ";
	}

	cipherText = cipherText.trim();
	var pairs = cipherText.split(" ");
	
	for (var i =0; i < pairs.length; i++)
	{
		a = rev[pairs[i].charAt(0)];
		
		b = rev[pairs[i].charAt(1)];
		a = parseInt(a);
		b = parseInt(b);
		if(a<5 && b<5) { //both on row 1
			if(a==0) a=4; else a--;
			if(b==0) b=4; else b--;
		} else if(a>=5 && b>=5 && a<10 && b<10) { //both on row 2
			if(a==5) a=9; else a--;
			if(b==5) b=9; else b--;
		} else if(a>=10 && b>=10 && a<15 && b<15) { //both on row 3
			if(a==10) a=14; else a--;
			if(b==10) b=14; else b--;
		} else if(a>=15 && b>=15 && a<20 && b<20) { //both on row 4
			if(a==15) a=19; else a--;
			if(b==15) b=19; else b--;
		} else if(a>=20 && b>=20 && a<25 && b<25) { //both on row 5
			if(a==20) a=24; else a--;
			if(b==20) b=24; else b--;
		} else if(a%5==0 && b%5==0) { //both on col 1
			if(a==0) a=20; else a-=5;
			if(b==0) b=20; else b-=5;
		} else if(a%5==1 && b%5==1) { //both on col 2
			if(a==1) a=21; else a-=5;
			if(b==1) b=21; else b-=5;
		} else if(a%5==2 && b%5==2) { //both on col 3
			if(a==2) a=22; else a-=5;
			if(b==2) b=22; else b-=5;
		} else if(a%5==3 && b%5==3) { //both on col 4
			if(a==3) a=23; else a-=5;
			if(b==3) b=23; else b-=5;
		} else if(a%5==4 && b%5==4) { //both on col 5
			if(a==4) a=24; else a-=5;
			if(b==4) b=24; else b-=5;
		} else { //rectangle
			cola = a%5;
			colb = b%5;
			a+=colb-cola;
			b+=cola-colb;
		}
		decoded += sub[a]+sub[b];
	}
	return decoded;
}

function bifid_get_grid() {
	var grid = new Array();
	grid[1] = ['','a','b','c','d','e'];
	grid[2] = ['','f','g','h','i','k'];
	grid[3] = ['','l','m','n','o','p'];
	grid[4] = ['','q','r','s','t','u'];
	grid[5] = ['','v','w','x','y','z'];
	
	return grid;
}

function bifid_get_poly() {
	var poly = new Array();
	poly['a'] = "11";
	poly['b'] = "12";
	poly['c'] = "13";
	poly['d'] = "14";
	poly['e'] = "15";
	poly['f'] = "21";
	poly['g'] = "22";
	poly['h'] = "23";
	poly['j'] = "24";
	poly['i'] = "24";
	poly['k'] = "25";
	poly['l'] = "31";
	poly['m'] = "32";
	poly['n'] = "33";
	poly['o'] = "34";
	poly['p'] = "35";
	poly['q'] = "41";
	poly['r'] = "42";
	poly['s'] = "43";
	poly['t'] = "44";
	poly['u'] = "45";
	poly['v'] = "51";
	poly['w'] = "52";
	poly['x'] = "53";
	poly['y'] = "54";
	poly['z'] = "55";
	poly[' '] = "";
	
	return poly;
}

function bifid_encode(plainText) {
	plainText = plainText.toLowerCase().replace(/[^a-z]/g, "").trim();
	plainText = (plainText === undefined || plainText == "") ? "secretmessage" : plainText;
	var grid = bifid_get_grid();
	var poly = bifid_get_poly();
	
	var encoded = "";
	
	var one = "";
	var two = "";
	for (var i = 0; i < plainText.length; i++)
	{
		code = poly[plainText.charAt(i)];
		if (code)
		{
			one += code.charAt(0);
			two += code.charAt(1);
		}
	}
	code = one + two;

	for (var i = 0; i < code.length - 1; i+=2)
		encoded += grid[code.charAt(i)][code.charAt(i+1)];
		
	return encoded;
}

function bifid_decode(cipherText) {
	cipherText = cipherText.toLowerCase().replace(/[^a-z]/g, "").trim();
	cipherText = (cipherText === undefined || cipherText == "") ? "qddltbcxkrxlk" : cipherText;
	
	var grid = bifid_get_grid();
	var poly = bifid_get_poly();
	
	var decoded = "";
	var code = "";
	
	for (var i = 0; i < cipherText.length; i++)
		code += poly[cipherText.charAt(i)];

	one = code.substr(0, code.length/2);
	two = code.substr(code.length/2);
	
	for (var i = 0; i < one.length; i++)
		decoded += grid[one.charAt(i)][two.charAt(i)];
	
	return decoded;
}

function trifid_get_grid() {
	var grid = new Array();
	grid[1] = ['', ['',"a", 'd', 'g'], ['','b', 'e','h'], ['','c','f','i']];
	grid[2] = ['', ['',"j", 'm', 'p'], ['','k', 'n','q'], ['','l','o','r']];	
	grid[3] = ['', ['',"s", 'v', 'y'], ['','t', 'w','z'], ['','u','x','.']];	
	return grid;
}

function trifid_get_poly() {
	var poly = new Array();
		poly['a'] = "111";
		poly['b'] = "121";
		poly['c'] = "131";
		poly['d'] = "112";
		poly['e'] = "122";
		poly['f'] = "132";
		poly['g'] = "113";
		poly['h'] = "123";
		poly['i'] = "133";
		poly['j'] = "211";
		poly['k'] = "221";
		poly['l'] = "231";
		poly['m'] = "212";
		poly['n'] = "222";
		poly['o'] = "232";
		poly['p'] = "213";
		poly['q'] = "223";
		poly['r'] = "233";
		poly['s'] = "311";
		poly['t'] = "321";
		poly['u'] = "331";
		poly['v'] = "312";
		poly['w'] = "322";
		poly['x'] = "332";
		poly['y'] = "313";
		poly['z'] = "323";
		poly['.'] = "333";
		poly[' '] = "";
	
	return poly;
	
}

function trifid_encode(plainText) {
	plainText = plainText.toLowerCase().replace(/[^a-z\.]/g, "").trim();
	plainText = (plainText === undefined || plainText == "") ? "secretmessage" : plainText;
	var grid = trifid_get_grid();
	
	var poly = trifid_get_poly();
	
	var one = "";
	var two = "";
	var three = "";
	
	for (var i =0; i< plainText.length; i++)
	{
		code = poly[plainText.charAt(i)];
		if (code)
		{
			one += code.charAt(0);
			two += code.charAt(1);
			three += code.charAt(2);
		}
	}
	
	code = one + two + three;
	
	var encoded = "";
	
	for (var i =0; i < code.length; i+=3)
		encoded += grid[code.charAt(i)][code.charAt(i+1)][code.charAt(i+2)];
	
	return encoded;
}

function trifid_decode(cipherText) {
	cipherText = cipherText.toLowerCase().replace(/[^a-z\.]/g, "").trim();
	cipherText = (cipherText === undefined || cipherText == "") ? "sppsdxmabpmjf" : cipherText;
	var grid = trifid_get_grid();
	
	var poly = trifid_get_poly();
	
	var code = "";
	for (var i = 0; i < cipherText.length; i++)
		code += poly[cipherText.charAt(i)];
	
	var rowlen = code.length / 3;
	var one = code.substr(0,rowlen);
	var two = code.substr(rowlen,rowlen);
	var three = code.substr(2*rowlen);

	var decoded = "";
	for (var i = 0; i < one.length; i++)
		decoded += grid[one.charAt(i)][two.charAt(i)][three.charAt(i)];

	return decoded;
}

function morse_get_array() {
	var morse = new Array(); 
	
	morse['a'] = ".-";
	morse['b'] = "-...";
	morse['c'] = "-.-.";
	morse['d'] = "-..";
	morse['e'] = ".";
	morse['f'] = "..-.";
	morse['g'] = "--.";
	morse['h'] = "....";
	morse['i'] = "..";
	morse['j'] = ".---";
	morse['k'] = "-.-";
	morse['l'] = ".-..";
	morse['m'] = "--";
	morse['n'] = "-.";
	morse['o'] = "---";
	morse['p'] = ".--.";
	morse['q'] = "--.-";
	morse['r'] = ".-.";
	morse['s'] = "...";
	morse['t'] = "-";
	morse['u'] = "..-";
	morse['v'] = "...-";
	morse['w'] = ".--";
	morse['x'] = "-..-";
	morse['y'] = "-.--";
	morse['z'] = "--..";

	morse['1'] = ".----";
	morse['2'] = "..---";
	morse['3'] = "...--";
	morse['4'] = "....-";
	morse['5'] = ".....";
	morse['6'] = "-....";
	morse['7'] = "--...";
	morse['8'] = "---..";
	morse['9'] = "----.";
	morse['0'] = "-----";
	
	morse[' '] = "";
	
	return morse;
}

function morseCode_encode(plainText) {
	plainText = plainText.toLowerCase().replace(/[^a-z0-9 ]/g, "");
	plainText = (plainText === undefined || plainText == "") ? "This is a message" : plainText;
	
	var morse = morse_get_array();
	
	var encoded = "";
	for (var i = 0; i < plainText.length; i++)
		encoded += morse[plainText.charAt(i)] + " ";
		
	return encoded;
}

function morseCode_decode(cipherText) {
	cipherText = (cipherText === undefined || cipherText == "") ? "- .... .. ...   .. ...   .-   -- . ... ... .- --. ." : cipherText;
	var letters = cipherText.split(" ");
	var morse = array_flip(morse_get_array());
	
	var decoded = "";
	for (var i = 0; i < letters.length; i++)
	{
		if (letters[i] !== "")
			if (morse[letters[i]] !== undefined)
				decoded += morse[letters[i]];
			else
				decoded += " ";
	}
	return decoded;
}

function tapcode_get_array() {
	var morse = new Array();
	morse['a'] = ". .";
	morse['b'] = ". ..";
	morse['c'] = ". ...";
	morse['d'] = ". ....";
	morse['e'] = ". .....";
	morse['f'] = ".. .";
	morse['g'] = ".. ..";
	morse['h'] = ".. ...";
	morse['i'] = ".. ....";
	morse['j'] = ".. .....";
	morse['k'] = ". ...";
	morse['l'] = "... .";
	morse['m'] = "... ..";
	morse['n'] = "... ...";
	morse['o'] = "... ....";
	morse['p'] = "... .....";
	morse['q'] = ".... .";
	morse['r'] = ".... ..";
	morse['s'] = ".... ...";
	morse['t'] = ".... ....";
	morse['u'] = ".... .....";
	morse['v'] = "..... .";
	morse['w'] = "..... ..";
	morse['x'] = "..... ...";
	morse['y'] = "..... ....";
	morse['z'] = "..... .....";
	morse[' '] = "/";
	
	return morse;
}

function tapCode_encode(plainText) {
	plainText = plainText.toLowerCase().replace(/[^a-z ]/g, "");
	plainText = (plainText === undefined || plainText == "") ? "This is a message" : plainText;
	
	var tapcode = tapcode_get_array();
	
	var encoded = "";
	
	for (var i = 0; i < plainText.length; i++)
		encoded += tapcode[plainText.charAt(i)] + "  ";
	
	return encoded;
}

function tapCode_decode(cipherText) {
	cipherText = (cipherText === undefined || cipherText == "") ? "- .... .. ...   .. ...   .-   -- . ... ... .- --. ." : cipherText;
	var letters = cipherText.split("  ");
	var tapcode = array_flip(tapcode_get_array());
	
	var decoded = "";
	for (var i = 0; i < letters.length; i++)
	{
		if (letters[i] !== "" && tapcode[letters[i]] !== undefined)
				decoded += tapcode[letters[i]];
		else
				decoded += " ";
	}
	return decoded;
	
}

function asciiCode_encode(plainText) {
	plainText = (plainText === undefined || plainText == "") ? "This is a message" : plainText;
	
	var encoded = "";
	for (var i =0; i < plainText.length; i++)
		encoded += plainText.charCodeAt(i) + " ";

	return encoded;
}

function asciiCode_decode(cipherText) {
	cipherText = (cipherText === undefined || cipherText == "") ? "84 104 105 115 32 105 115 32 97 32 115 101 99 114 101 116 32 109 101 115 115 97 103 101" : cipherText;
	
	var message = cipherText.split(" ");
	var decoded ="";
	for (var i = 0;i<message.length; i++)
		decoded += String.fromCharCode(message[i]);
		
	return decoded;
}

//Utility tools

function array_flip( trans )
{
    var key, tmp_ar = {};

    for ( key in trans )
    {
        if ( trans.hasOwnProperty( key ) )
        {
            tmp_ar[trans[key]] = key;
        }
    }

    return tmp_ar;
}
function empty (mixed_var) {
    // http://kevin.vanzonneveld.net
    // +   original by: Philippe Baumann
    // +      input by: Onno Marsman
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: LH
    // +   improved by: Onno Marsman
    // +   improved by: Francesco
    // +   improved by: Marc Jansen
    // +   input by: Stoyan Kyosev (http://www.svest.org/)
    // *     example 1: empty(null);
    // *     returns 1: true
    // *     example 2: empty(undefined);
    // *     returns 2: true
    // *     example 3: empty([]);
    // *     returns 3: true
    // *     example 4: empty({});
    // *     returns 4: true
    // *     example 5: empty({'aFunc' : function () { alert('humpty'); } });
    // *     returns 5: false
    var key;

    if (mixed_var === "" || mixed_var === 0 || mixed_var === "0" || mixed_var === null || mixed_var === false || typeof mixed_var === 'undefined') {
        return true;
    }

    if (typeof mixed_var == 'object') {
        for (key in mixed_var) {
            return false;
        }
        return true;
    }

    return false;
}
if (!Array.prototype.indexOf)
{
  Array.prototype.indexOf = function(elt /*, from*/)
  {
    var len = this.length >>> 0;

    var from = Number(arguments[1]) || 0;
    from = (from < 0)
         ? Math.ceil(from)
         : Math.floor(from);
    if (from < 0)
      from += len;

    for (; from < len; from++)
    {
      if (from in this &&
          this[from] === elt)
        return from;
    }
    return -1;
  };
}
if (!('trim' in String.prototype)) {   
String.prototype.trim = function() { return this.replace(/^\s+|\s+$/g,""); };    
} 