# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'open-uri'
doc = Nokogiri::HTML(open('http://philly.thedrinknation.com/specials'))

tally = 5
85.times do
  Bar.create(
    name: doc.xpath('//h2//a')[tally].children.text.delete("\n").strip,
    address: doc.css('div[class=barMeta]')[tally].children[2].text.to_s.delete("\n").gsub(/\([^)]+\)\s+/,'').strip,
    town: doc.css('div[class=barMeta]')[tally].children[1].text.to_s.delete("\n").gsub(/\([^)]+\)\s+/,'').strip.split('             ').last,
    phone_number: doc.css('div[class=barMeta]')[tally].children[5].text.delete("<br/>").strip,
    website: doc.css('div[class=barMeta]')[tally].children[7].text.delete("\n").strip,
    happy_hour_info: doc.css('div[class=barMeta]')[tally].children[9].text.gsub("\n ", '<br />').strip.gsub(/\s+/, ' ').gsub('(<br /> ', '(').gsub('-<br />', '-').gsub(' ):<br />', '):').gsub('<br />', "\n")
  )
  tally = tally + 3
end

bars = Bar.all
bars.each do |bar|
  response = HTTParty.get("https://maps.googleapis.com/maps/api/geocode/json?address=#{bar.address},Philadelphia,PA&key=AIzaSyBoKBYjQZEa8J51cde3e3WWBpZfbr8KSZc")
  bar.update(coords_lat: response['results'][0]['geometry']['location']['lat'], coords_lng: response['results'][0]['geometry']['location']['lng'])
end
