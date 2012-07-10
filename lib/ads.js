var oas="http://oascentral.motherjones.com/RealMedia/ads/";
var RN = String (Math.random());
var RNS = RN.substring (2, 11);

function DisplayAds(b, arg, d, a){
        var mj_adpath = window.location.pathname.split("/");
        var sitepage = 'motherjones.com/' + mj_adpath[1] + '/page.html';
	if (sitepage === "motherjones.com//page.html") {
		sitepage = "motherjones.com/page.html";
	}

  var parameter_start = '?';

  var c = sitepage+"/1"+RNS+"@"+b;

  if ( RM_exclusion_category && typeof RM_exclusion_category !== 'undefined') {
      c += parameter_start + 'RM_Exclude=' + RM_exclusion_category;
      parameter_start = '&';
  }

  if ( Drupal && Drupal.settings.denali.ad_primary_tags !== null) {
      c += parameter_start + 'XE';
      parameter_start = '&';
      //all analytics stuff must go in here, beware if block above
      for ( var i = 0; i < Drupal.settings.denali.ad_primary_tags.length; i++ ) {
          c += '&PrimaryTag=' + Drupal.settings.denali.ad_primary_tags[i];
      }
      //end block where we can put analytics
      c += '&XE';
  }
  var output = ('<SCRIPT LANGUAGE=javascript SRC="'+oas+"adstream_jx.ads/"+c+'">');
  output += ("<!-- -->");
  output += ("</SCRIPT>");
  output += ("<!-- -->");
  return output;
}
