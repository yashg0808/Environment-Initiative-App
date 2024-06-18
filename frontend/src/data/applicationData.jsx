export const DRAWER_ITEMS = [
    {
      id: 1,
      textKey: "home",
      navigateTo: "/",
    },
    {
      id: 2,
      textKey: "about",
      navigateTo: "/about",
    },
    {
      id: 3,
      textKey: "login",
      navigateTo: "/login",
    },
];

export const getNavigationItemList = (isLoggedIn,username) => {
    const tempDrawerItems = [...DRAWER_ITEMS];
    if (isLoggedIn) {
      tempDrawerItems.pop();
      tempDrawerItems.pop();
      tempDrawerItems.push({
        id: 3,
        textKey: "Initiatives",
        navigateTo: "/initiatives",
      });
      tempDrawerItems.push({
        id: 4,
        textKey: "My Account",
        navigateTo: `/u?profile=${username}`,
      });
    }
    return tempDrawerItems;
};  