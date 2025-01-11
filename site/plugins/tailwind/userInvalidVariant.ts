import plugin from 'tailwindcss/plugin';

// Work around until https://github.com/tailwindlabs/tailwindcss/pull/12370 is merged
const userInvalidVariantPlugin = plugin(({ addVariant }) => {
  addVariant('peer-user-invalid', '.peer:user-invalid ~ &');
  addVariant('user-invalid', '&:user-invalid');
});

export default userInvalidVariantPlugin;
