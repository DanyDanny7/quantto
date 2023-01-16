export const getCardType = (number) => {

    // visa
    let re = new RegExp("^4");
    if (number.match(re) != null)
      return "Visa";

    // Mastercard
    // Updated for Mastercard 2017 BINs expansion
    if (/^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(number))
      return "Mastercard";

    // American express
    re = new RegExp("^3[47]");
    if (number.match(re) != null)
      return "American express";

    // Discover
    re = new RegExp("^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)");
    if (number.match(re) != null)
      return "Discover";

    // Diners
    re = new RegExp("^36");
    if (number.match(re) != null)
      return "Diners";

    // Diners
    re = new RegExp("^3(?:0[0-59]{1}|[689])[0-9]{0,}");
    if (number.match(re) != null)
      return "Diners";

    // Diners - Carte Blanche
    re = new RegExp("^30[0-5]");
    if (number.match(re) != null)
      return "Diners - Carte Blanche";

    // JCB
    re = new RegExp("^35(2[89]|[3-8][0-9])");
    if (number.match(re) != null)
      return "JCB";

    // JCB
    re = new RegExp("^(?:2131|1800|35)[0-9]{0,}$");
    if (number.match(re) != null)
      return "JCB";

    // JCB
    re = new RegExp("^30");
    if (number.match(re) != null)
      return "JCB";

    // Visa Electron
    re = new RegExp("^(4026|417500|4508|4844|491(3|7))");
    if (number.match(re) != null)
      return "Visa Electron";

    // Maestro
    re = new RegExp("^(5018|5020|5038|5612|5893|6304|6759|6761|6762|6763|0604|6390)");
    if (number.match(re) != null)
      return "Maestro";

    // Maestro
    re = new RegExp("^(5[06789]|6)[0-9]{0,}");
    if (number.match(re) != null)
      return "Maestro";

    // Dankort
    re = new RegExp("^(5019)");
    if (number.match(re) != null)
      return "Dankort";

    // Interpayment
    re = new RegExp("^(636)");
    if (number.match(re) != null)
      return "Interpayment";

    // Unionpay
    re = new RegExp("^(62|88)");
    if (number.match(re) != null)
      return "Unionpay";

    return "";

  }
