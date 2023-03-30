"use client"
import * as React from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { styled, keyframes } from '@stitches/react';
import { AvatarIcon, CaretDownIcon } from '@radix-ui/react-icons';
import { violet, mauve, indigo, purple, blackA, blue, gray, whiteA, green, blueDark, grayDark, orange } from '@radix-ui/colors';
import Image from 'next/image';
import CartSummary from './cart-summary';
import { useShoppingCart } from 'use-shopping-cart';
import { useFlags, useLDClient } from 'launchdarkly-react-client-sdk';
import Login from './login';
import {v4 as uuid} from 'uuid'


const NavigationMenuDemo = () => {
const {billing, storeEnabled, adminMode} = useFlags();
const {cartCount} = useShoppingCart();

const [userName, setUserName] = React.useState<any>('');
const ldClient = useLDClient();

React.useEffect(() => {
  if (userName) {
    ldClient?.identify(
      {kind: 'user',
      key: uuid(),
      name: userName,
    }
    )
  }
}, [userName])

  return (
    <NavigationMenuRoot>
        <a href="/"><Image 
        src = '/images/ld-logo.png' 
        alt = 'LaunchDarkly Logo'
        width={160}
        height={25}
        quality={100}
        style={{margin: 2, position: 'initial'}}
        />
        </a>
      <NavigationMenuList>
        {adminMode ? 
        <NavigationMenu.Item>
          <NavigationMenuLink href='/inventory-screen'>Admin Panel</NavigationMenuLink>
        </NavigationMenu.Item> :
        <NavigationMenu.Item>
          <NavigationMenuTrigger>
            Learn <CaretDown aria-hidden />
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
        </NavigationMenu.Item>}
        {(billing && storeEnabled) ?
        <NavigationMenu.Item>
          <NavigationMenuTrigger>
            Cart ({cartCount}) <CaretDown aria-hidden />
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div style={{minWidth: '275px', margin: 30}}>
            <CartSummary />
            </div>
          </NavigationMenuContent>
        </NavigationMenu.Item>
        : null }
      {userName ?<NavigationMenu.Item>
        <NavigationMenuLink>
         {userName}
          </NavigationMenuLink>
        </NavigationMenu.Item>:                
      <Login login={setUserName} />}
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
  position: 'relative',
  display: 'flex',
  justifyContent: 'space-between',
  width: '100vw',
  zIndex: 0,
});

const NavigationMenuList = styled(NavigationMenu.List, {
  display: 'flex',
  justifyContent: 'space-between',
  backgroundColor: 'none',
  padding: 4,
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
  gap: 2,
});

const NavigationMenuLink = styled(NavigationMenu.Link, {
  ...itemStyles,
  display: 'block',
  fontFamily: 'Sohne',
  textDecoration: 'none',
  fontSize: 15,
  lineHeight: 1,
});

const NavigationMenuContent = styled(NavigationMenu.Content, {
  position: 'absolute',
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
  zIndex: 1,
  transition: 'width, transform 250ms ease',
  '&[data-state="visible"]': { animation: `${fadeIn} 200ms ease` },
  '&[data-state="hidden"]': { animation: `${fadeOut} 200ms ease` },
});

const NavigationMenuViewport = styled(NavigationMenu.Viewport, {
  position: 'relative',
  transformOrigin: 'top center',
  marginTop: 10,
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

export default NavigationMenuDemo;
