// filename: app/components/ShopifyInbox.jsx
import { Script } from '@shopify/hydrogen';

export function ShopifyInbox({
  button,
  shop,
  env = 'production',
  version = 'V1',
}) {
  if (!shop?.domain || !shop?.id) {
    // eslint-disable-next-line no-console
    console.error(
      'ShopifyInbox: shop domain and id are required. You can get these values from the app settings.'
    );
    return null;
  }

  const defaultButton = {
    color: 'black',
    style: 'icon',
    horizontalPosition: 'button_right',
    verticalPosition: 'lowest',
    text: 'chat_with_us',
    icon: 'chat_bubble',
  };

  const buttonKeyMap = {
    color: 'c',
    style: 's',
    horizontalPosition: 'p',
    verticalPosition: 'vp',
    text: 't',
    icon: 'i',
  };

  if (typeof button === 'undefined') {
    button = defaultButton;
  }

  // create the button search params based on the button object props
  const buttonParams = Object.keys(button).reduce((acc, key) => {
    const value = button?.[key];

    if (typeof value !== 'undefined') {
      const paramKey = buttonKeyMap[key];
      acc[paramKey] = value;
    } else {
      const defaultValue = defaultButton?.[key];
      if (!defaultValue) return acc;
      const paramKey = buttonKeyMap[key];
      acc[paramKey] = defaultValue;
    }
    return acc;
  }, {});

  const baseUrl = `https://cdn.shopify.com/shopifycloud/shopify_chat/storefront/shopifyChat${version}.js`;
  const buttonSearch = new URLSearchParams(buttonParams).toString();

  return (
    <Script
      id="shopify-inbox"
      suppressHydrationWarning
      async={true}
      src={`${baseUrl}?v=${version}&api_env=${env}&shop_id=${shop.id}&shop=${shop.domain}&${buttonSearch}`}
    />
  );
}
