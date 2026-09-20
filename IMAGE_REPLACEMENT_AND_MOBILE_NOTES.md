# Image replacement update

All site content images now come only from the 18 supplied images. Remote Unsplash image URLs were removed.

## Assignment logic
- Jaipur: Jaipur Hawa Mahal / Jaipur Sangeet / block printing
- Udaipur: Udaipur wedding, lakeside table, palace
- Varanasi: family wedding on ghats, ghats, lamp ritual, Dev Deepawali, classical music
- Kolkata: Kolkata street
- Goa: Goa colonial lane
- Rishikesh: riverside yoga, bridge
- Community/Festival: Ganesh Chaturthi image
- Wedding moments: Mehendi detail, Sangeet, wedding welcome, dinner

No image is intentionally assigned to an unrelated destination simply to fill a slot. Where a supplied image does not identify a city, it is used for its event/category relationship instead.

## Mobile/responsive updates
- Global horizontal overflow prevention
- Smaller mobile page gutters
- Header reduced on small screens with scrollable mobile menu
- Hero minimum height reduced for phones
- Hero captions and CTA buttons resized for narrow viewports
- Experience story selectors scroll horizontally rather than squeezing off-screen
- Mobile story media uses a shorter viewport-based height

## Local image delivery
Images are stored in `public/images` as WebP to reduce transfer size while keeping high-resolution source dimensions.


## City-match rule
Where the supplied library contains an explicit city/location image, the homepage destination card and relevant experience media use that city image. Where the library has no image for a named city (for example Delhi or Pune), the site uses the closest event/category image available rather than pretending it is a city-specific photograph.
