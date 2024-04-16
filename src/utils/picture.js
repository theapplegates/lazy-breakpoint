const sharp = require('sharp');

module.exports = (url, alt = "Missing alt text") => {
    const imageName = url.split('.').shift();
    const outputFormats = ['avif', 'webp', 'jpg'];

    const breakpoints = {
        xxlarge: 800,
        xlarge: 600,
        large: 480,
        medium: 320,
        small: 240,
        xsmall: 160
    };

    const formatPromises = outputFormats.map(format => {
        return Promise.all(Object.entries(breakpoints).map(([size, width]) => {
            return sharp(`/images/${url}`)
                .resize({ width })
                [format]({ quality: 80 })
                .toFile(`/images/${size}/${imageName}.${format}`);
        }));
    });

    Promise.all(formatPromises)
        .then(() => {
            return `<picture>
                <source srcset="/images/xxlarge/${imageName}.avif" type="image/avif" media="(min-width: 800px)">
                <source srcset="/images/xxlarge/${imageName}.webp" type="image/webp" media="(min-width: 800px)">
                <source srcset="/images/xlarge/${imageName}.avif" type="image/avif" media="(min-width: 600px)">
                <source srcset="/images/xlarge/${imageName}.webp" type="image/webp" media="(min-width: 600px)">
                <source srcset="/images/large/${imageName}.avif" type="image/avif" media="(min-width: 480px)">
                <source srcset="/images/large/${imageName}.webp" type="image/webp" media="(min-width: 480px)">
                <source srcset="/images/medium/${imageName}.avif" type="image/avif" media="(min-width: 320px)">
                <source srcset="/images/medium/${imageName}.webp" type="image/webp" media="(min-width: 320px)">
                <source srcset="/images/small/${imageName}.avif" type="image/avif" media="(min-width: 240px)">
                <source srcset="/images/small/${imageName}.webp" type="image/webp" media="(min-width: 240px)">
                <source srcset="/images/xsmall/${imageName}.avif" type="image/avif" media="(max-width: 239px)">
                <source srcset="/images/xsmall/${imageName}.webp" type="image/webp" media="(max-width: 239px)">
                <img src="/images/${imageName}.jpg" alt="${alt}" />
            </picture>`;
        })
        .catch(err => console.error("Error generating image formats:", err));
};