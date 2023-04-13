"use client"
import * as React from 'react';
import Link from 'next/link';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { styled, keyframes } from '@stitches/react';
import { CaretDownIcon } from '@radix-ui/react-icons';
import { mauve, blackA, blueDark, grayDark, red, slate, whiteA } from '@radix-ui/colors';
import CartSummary from './cart-summary';
import { useShoppingCart } from 'use-shopping-cart';
import { useFlags, useLDClient } from 'launchdarkly-react-client-sdk';
import Login from './login';
import Image from 'next/image';

// TODO: I had to move ldclient because I couldn't define it here but then I can't call the hook
// from here. If I move the function inside the component definition I get the same issues. WTAF


const NavigationMenuDemo = ({country}: any) => {
const {billing, storeEnabled, adminMode, newProductExperienceAccess, customerDebugPanel} = useFlags();
const {cartCount} = useShoppingCart();

const ldclient = useLDClient();

const changeCountry = (country: any) => {
  if (ldclient) {
    console.log("foo")
    const context: any = ldclient?.getContext();
    console.log(context)
    context.location.country = country;
    ldclient?.identify(context);
  }
}

  return (
    <NavigationMenuRoot>
        <Link href="/">
          <Image src="/osmo.png" alt="logo" width={50} height={50} />
        </Link>
      <NavigationMenuList>
        
        {adminMode ? (
        <NavigationMenu.Item>
          <NavigationMenuTrigger>
          <Button>
            <Link href='/inventory-screen'>Admin Panel</Link>
          </Button>
          </NavigationMenuTrigger>
        </NavigationMenu.Item>):null}
        {customerDebugPanel ? (<NavigationMenu.Item>
          <NavigationMenuTrigger>
            <Button>Debug Data <CaretDown aria-hidden /></Button>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <List>
            <ListItem title="Selected Country">
              {country}
            </ListItem>
            <ListItem title="Product Categories">
              {newProductExperienceAccess.replaceAll('"','').replaceAll(',','s, ')}s
            </ListItem>
            <ListItem title="Admin Access">
              {adminMode ? 'Enabled' : 'Disabled'}
            </ListItem>
            <ListItem title="Billing API">
              {billing ? 'Enabled' : 'Disabled'}
            </ListItem>
          </List>
          </NavigationMenuContent>
        </NavigationMenu.Item>
        ):null}
        {customerDebugPanel ? (<NavigationMenu.Item>
          <NavigationMenuTrigger>
            <Button>Debug Country<CaretDown aria-hidden /></Button>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <List>
              <ListItem onClick={changeCountry.bind(null,'US')} title="USA">🇺🇸</ListItem>
              <ListItem onClick={changeCountry.bind(null,'MX')} title="Mexico">🇲🇽</ListItem>
              <ListItem onClick={changeCountry.bind(null,'CA')} title="Canada">🇨🇦</ListItem>
              <ListItem onClick={changeCountry.bind(null,'UK')}title="United Kingdom">🇬🇧</ListItem>
              <ListItem onClick={changeCountry.bind(null,'FR')} title="France">🇫🇷</ListItem>
              <ListItem onClick={changeCountry.bind(null,'PT')} title="Portugal">🇵🇹</ListItem>
            </List>
          </NavigationMenuContent>
        </NavigationMenu.Item>
        ):null}
        <NavigationMenu.Item>
          <NavigationMenuTrigger>
            <Button>
            Learn <CaretDown aria-hidden />
            </Button>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <List>
              <li style={{ gridRow: 'span 3' }}>
                <NavigationMenu.Link asChild>
                  <Callout href="/">
                    <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 216 214.94" aria-hidden width="38" height="38" fill="white">
                    <path className = "cls-1" d="M109.8,214.94a4.87,4.87,0,0,1-4.26-2.66,4.5,4.5,0,0,1,.44-4.82l50.49-69.53L68,174.11a4.61,4.61,0,0,1-1.9.41,4.77,4.77,0,0,1-4.52-3.4,4.57,4.57,0,0,1,2-5.21L141.33,120,4.41,112.13a4.69,4.69,0,0,1,0-9.36l137-7.87L63.61,49a4.56,4.56,0,0,1-1.94-5.2,4.74,4.74,0,0,1,4.51-3.4,4.6,4.6,0,0,1,1.9.4L156.5,77,106,7.48a4.56,4.56,0,0,1-.44-4.83A4.84,4.84,0,0,1,109.84,0a4.59,4.59,0,0,1,3.28,1.41L213.77,102.05a7.65,7.65,0,0,1,0,10.8L113.08,213.53A4.59,4.59,0,0,1,109.8,214.94Z"/>
                    </svg>
                    <CalloutHeading>LaunchDarkly</CalloutHeading>
                    <CalloutText>Learn more about feature management.</CalloutText>
                  </Callout>
                </NavigationMenu.Link>
              </li>
              <ListItem href="https://docs.launchdarkly.com/home/getting-started/feature-flags" title="Feature Flags">
               Learn how to deploy your first feature flag.
              </ListItem>
              <ListItem href="https://docs.launchdarkly.com/sdk" title="SDKs">
                LaunchDarkly supports more that 25 different SDKs.
              </ListItem>
              <ListItem href="https://docs.launchdarkly.com/home/about-experimentation" title="Experimentation">
                LaunchDarkly experimentation helps you optimize your site.
              </ListItem>
            </List>
          </NavigationMenuContent>
        </NavigationMenu.Item>
        {(billing && storeEnabled) ?
        <NavigationMenu.Item>
          <NavigationMenuTrigger>
            <Button>
            Cart ({cartCount}) <CaretDown aria-hidden />
            </Button>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div style={{minWidth: '275px', margin: 30}}>
            <CartSummary />
            </div>
          </NavigationMenuContent>
        </NavigationMenu.Item>
        : null } 
        <NavigationMenu.Item>
          <NavigationMenuTrigger>
            <Login />
          </NavigationMenuTrigger>
        </NavigationMenu.Item>
      </NavigationMenuList>
      <ViewportPosition>
        <NavigationMenuViewport />
      </ViewportPosition>
    </NavigationMenuRoot>
  );
};

const enterFromRight = keyframes({
  from: { transform: 'translateX(200px)', opacity: 0 },
  to: { transform: 'translateX(0)', opacity: 1 },
});

const enterFromLeft = keyframes({
  from: { transform: 'translateX(-200px)', opacity: 0 },
  to: { transform: 'translateX(0)', opacity: 1 },
});

const exitToRight = keyframes({
  from: { transform: 'translateX(0)', opacity: 1 },
  to: { transform: 'translateX(200px)', opacity: 0 },
});

const exitToLeft = keyframes({
  from: { transform: 'translateX(0)', opacity: 1 },
  to: { transform: 'translateX(-200px)', opacity: 0 },
});

const scaleIn = keyframes({
  from: { transform: 'rotateX(-30deg) scale(0.9)', opacity: 0 },
  to: { transform: 'rotateX(0deg) scale(1)', opacity: 1 },
});

const scaleOut = keyframes({
  from: { transform: 'rotateX(0deg) scale(1)', opacity: 1 },
  to: { transform: 'rotateX(-10deg) scale(0.95)', opacity: 0 },
});

const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

const fadeOut = keyframes({
  from: { opacity: 1 },
  to: { opacity: 0 },
});

const NavigationMenuRoot = styled(NavigationMenu.Root, {
  // position: 'relative',
  // display: 'flex',
  // justifyContent: 'center',
  // width: '100vw',
  // zIndex: 999,
  position: 'relative',
  display: 'flex',
  justifyContent: 'space-between',
  width: '100vw',
  zIndex: 999,
  
});

const NavigationMenuList = styled(NavigationMenu.List, {
  display: 'flex',
  justifyContent: 'space-between',
  backgroundColor: 'none',
  padding: 4,
  zIndex: 999,
  borderRadius: 6,
  listStyle: 'none',
  boxShadow: `0 2px 10px ${blackA.blackA7}`,
  margin: 0,
});

const itemStyles = {
  padding: '8px 12px',
  outline: 'none',
  userSelect: 'none',
  fontWeight: 500,
  lineHeight: 1,
  borderRadius: 4,
  fontSize: 15,
  color: blueDark.blue10,
  '&:focus': { boxShadow: `0 0 0 2px ${blueDark.blue7}` },
  '&:hover': { backgroundColor: blueDark.blue3 },
};

const NavigationMenuTrigger = styled(NavigationMenu.Trigger, {
  all: 'unset',
  ...itemStyles,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  zIndex: 999,
  gap: 2,
});

const NavigationMenuLink = styled(NavigationMenu.Link, {
  ...itemStyles,
  display: 'block',
  fontFamily: 'Sohne',
  textDecoration: 'none',
  fontSize: 15,
  lineHeight: 1,
  zIndex: 999
});

const TextArea = styled('h1', {
  fontFamily: 'Sohne',
  color: slate.slate1,
  fontSize: 35,
  verticalAlign: 'middle',
  display: 'block',
})

const NavigationMenuContent = styled(NavigationMenu.Content, {
  position: 'absolute',
  zIndex: 999,
  top: 0,
  left: 0,
  width: '100%',
  '@media only screen and (min-width: 600px)': { width: 'auto' },
  animationDuration: '250ms',
  animationTimingFunction: 'ease',
  '&[data-motion="from-start"]': { animationName: enterFromLeft },
  '&[data-motion="from-end"]': { animationName: enterFromRight },
  '&[data-motion="to-start"]': { animationName: exitToLeft },
  '&[data-motion="to-end"]': { animationName: exitToRight },
});

const NavigationMenuIndicator = styled(NavigationMenu.Indicator, {
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'center',
  height: 10,
  top: '100%',
  overflow: 'hidden',
  // zIndex: 1,
  transition: 'width, transform 250ms ease',
  '&[data-state="visible"]': { animation: `${fadeIn} 200ms ease` },
  '&[data-state="hidden"]': { animation: `${fadeOut} 200ms ease` },
});

const NavigationMenuViewport = styled(NavigationMenu.Viewport, {
  position: 'relative',
  transformOrigin: 'top center',
  marginTop: 10,
  zIndex: 999,
  width: '100%',
  backgroundColor: 'white',
  borderRadius: 6,
  overflow: 'hidden',
  boxShadow: 'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
  height: 'var(--radix-navigation-menu-viewport-height)',
  transition: 'width, height, 300ms ease',
  '&[data-state="open"]': { animation: `${scaleIn} 200ms ease` },
  '&[data-state="closed"]': { animation: `${scaleOut} 200ms ease` },
  '@media only screen and (min-width: 600px)': {
    width: 'var(--radix-navigation-menu-viewport-width)',
  },
});

const List = styled('ul', {
  display: 'grid',
  padding: 22,
  margin: 0,
  zIndex: 999,
  columnGap: 10,
  listStyle: 'none',
  variants: {
    layout: {
      one: {
        '@media only screen and (min-width: 600px)': {
          width: 500,
          gridTemplateColumns: '.75fr 1fr',
        },
      },
      two: {
        '@media only screen and (min-width: 600px)': {
          width: 600,
          gridTemplateRows: 'repeat(1, 1fr)',
          gridTemplateColumns: 'repeat(1, 1fr)'
        },
      },
    },
  },
  defaultVariants: {
    layout: 'one',
  },
});


const ListItem = React.forwardRef(({children, title, ...props}:any, forwardedRef: any) => (
  <li>
    <NavigationMenu.Link asChild>
      <ListItemLink {...props} ref={forwardedRef}>
        <ListItemHeading>{title}</ListItemHeading>
        <ListItemText>{children}</ListItemText>
      </ListItemLink>
    </NavigationMenu.Link>
  </li>
));
ListItem.displayName = "ListItem";

const ListItemLink = styled('a', {
  display: 'block',
  outline: 'none',
  textDecoration: 'none',
  userSelect: 'none',
  padding: 12,
  borderRadius: 6,
  fontSize: 15,
  lineHeight: 1,
  '&:focus': { boxShadow: `0 0 0 2px ${grayDark.gray7}` },
  '&:hover': { backgroundColor: mauve.mauve3 },
});

const ListItemHeading = styled('div', {
  fontWeight: 500,
  lineHeight: 1.2,
  marginBottom: 5,
  color: blackA.blackA11,
});

const ListItemText = styled('p', {
  all: 'unset',
  color: mauve.mauve11,
  lineHeight: 1.4,
  fontWeight: 'initial',
});

const Callout = styled('a', {
  display: 'flex',
  justifyContent: 'flex-end',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  background: `linear-gradient(135deg, ${blueDark.blue9} 0%, ${grayDark.gray9} 100%);`,
  borderRadius: 6,
  padding: 25,
  textDecoration: 'none',
  outline: 'none',
  userSelect: 'none',
  '&:focus': { boxShadow: `0 0 0 2px ${blueDark.blue7}` },
});

const CalloutHeading = styled('div', {
  color: 'white',
  fontSize: 18,
  fontWeight: 500,
  lineHeight: 1.2,
  marginTop: 16,
  marginBottom: 7,
});

const CalloutText = styled('p', {
  all: 'unset',
  color: mauve.mauve4,
  fontSize: 14,
  lineHeight: 1.3,
});

const ViewportPosition = styled('div', {
  position: 'absolute',
  display: 'flex',
  justifyContent: 'right',
  width: '100%',
  top: '100%',
  left: 0,
  perspective: '2000px',
});

const CaretDown = styled(CaretDownIcon, {
  position: 'relative',
  color: blueDark.blue10,
  top: 1,
  transition: 'transform 250ms ease',
  '[data-state=open] &': { transform: 'rotate(-180deg)' },
});

const Arrow = styled('div', {
  position: 'relative',
  top: '70%',
  backgroundColor: 'white',
  width: 10,
  height: 10,
  transform: 'rotate(45deg)',
  borderTopLeftRadius: 2,
});

const Button = styled("button", {
  all: "unset",
  display: "block",
  textDecoration: "none",
  padding: "6px 12px",
  outline: "none",
  userSelect: "none",
  // lineHeight: 1,
  fontSize: 20,
  fontFamily: "Sohne",
  color: blueDark.blue10,

  variants: {
    variant: {
      black: {
        backgroundColor: "black",
        color: blueDark.blue10,
        "&:hover": { backgroundColor: blueDark.blue3 },
        "&:focus": { boxShadow: `0 0 0 2px ${blackA.blackA1}` },
      },
      red: {
        backgroundColor: red.red4,
        color: red.red10,
        "&:hover": { backgroundColor: red.red6 },
        "&:focus": { boxShadow: `0 0 0 2px ${red.red7}` },
      },
      blue: {
        backgroundColor: "white",
        color: blueDark.blue1,
        boxShadow: `0 2px 10px ${blackA.blackA7}`,
        "&:hover": { backgroundColor: slate.slate7 },
        "&:focus": { boxShadow: `0 0 0 2px ${whiteA.whiteA1}` },
      },
    },
  },

  defaultVariants: {
    variant: "black",
  },
});

export default NavigationMenuDemo;
