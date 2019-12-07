
export function parseICard(text) {
  return [
      {'UIN': text.match(/(?<!\d)\d{9}(?!\d)/)[0]},
      {'Library': text.match(/(?<!\d)\d{14}(?!\d)/)[0]},
      {'Card': text.match(/(?<!\d)\d{16}(?!\d)/)[0]},
      {'Name': text.match(/^[A-Z, -]+$/gm).filter(text => !text.match(/illinois/i))[0]},
      {'Card Expires': text.match(/\d\d\/\d\d\/\d{4}/)[0]}
  ];
}

export function parseDriversLicence(text) {
  return [
    {'License Number': text.match(/LIC NO[^\w]? (.+)/im)[1]},
    {'Issue Date': text.match(/(?:l|i)ss[^\w]? (.+)/im)[1]},
    {'Expiry Date': text.match(/exp[^\w]? (.+)/im)[1]},
    {'Document Discriminator (DD)': text.match(/dd[^\w]? (.+)/im)[1]},
    {'Endorsements': text.match(/end[^\w]? (.+)/im)[1]},
    {'Restrictions': text.match(/r ?e ?s ?t[^\w]? (.+)/im)[1]},
    {'Height': text.match(/h ?g ?t[^\w]? (.+)/im)[1]},
    {'Weight': text.match(/w ?g ?t[^\w]? (.+bs)/im)[1]},
    {'Eye Color': text.match(/e ?y ?e ?s[^\w]? (.+)/im)[1]}
  ];
}

export function parseDocument(text, type) {
  switch(type) {
    case 'I-Card':
      return parseICard(text);
    case "Driver's License":
      return parseDriversLicence(text);
    default:
      return [];
  }
}