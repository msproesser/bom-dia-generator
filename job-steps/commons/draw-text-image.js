module.exports = async function(text, filename, prefix, {gravity, size}) {
  const sizeSetting = size ? `-size ${size}` : '';

  await exec(`convert \\
  -background transparent \\
  -fill white \
  -font 'Fawn-Script' \\
  ${sizeSetting} \\
  -gravity ${gravity} \\
  caption:'${text}' \\
  \\( +clone \\
  -background black \\
  -shadow 200x10+2+2 \\) +swap \\
  -background transparent \\
  -layers merge \\
  ./atmp/${prefix}-${filename}.png `);
}
