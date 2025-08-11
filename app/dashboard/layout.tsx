import { Sidebar } from "@/app/components/layout/sidebar";
import { Topbar } from "@/app/components/layout/topbar";

 import { ToastContainer } from "react-toastify";

 export default function DashboardLayout({
   children,
 }: {
   children: React.ReactNode;
 }) {
   return (
     <div className="flex h-screen overflow-hidden ">
       <Sidebar />
       <div className={"flex flex-col flex-1 overflow-hidden"}>
         <Topbar />

         <main
           className={
             "flex-1 overflow-y-auto overflow-x-hidden px-4 pt-4 bg-background"
           }
           style={{ paddingTop: 80 }}
         >
           {children}
           <ToastContainer />
         </main>
       </div>
     </div>
   );
 }

// export default function DashboardLayout({ children }) {
//   const { menuMasterLoading } = useGetMenuMaster();
//   const downXL = useMediaQuery((theme) => theme.breakpoints.down('xl'));
//   const downLG = useMediaQuery((theme) => theme.breakpoints.down('lg'));

//   const { container, miniDrawer, menuOrientation } = useConfig();

//   const isHorizontal = menuOrientation === MenuOrientation.HORIZONTAL && !downLG;

//   // set media wise responsive drawer
//   useEffect(() => {
//     if (!miniDrawer) {
//       handlerDrawerOpen(!downXL);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [downXL]);

//   if (menuMasterLoading) return <Loader />;

//   return (
//     <Box sx={{ display: 'flex', width: '100%' }}>
//       <Header />
//       {!isHorizontal ? <Drawer /> : <HorizontalBar />}

//       <Box component="main" sx={{ width: `calc(100% - ${DRAWER_WIDTH}px)`, flexGrow: 1, p: { xs: 1, sm: 3 } }}>
//         <Toolbar sx={{ mt: isHorizontal ? 8 : 'inherit', mb: isHorizontal ? 2 : 'inherit' }} />
//         <Container
//           maxWidth={container && !downXL ? 'xl' : false}
//           sx={{
//             ...(container && !downXL && { px: { xs: 0, sm: 3 } }),
//             position: 'relative',
//             minHeight: 'calc(100vh - 124px)',
//             display: 'flex',
//             flexDirection: 'column'
//           }}
//         >
//           <Breadcrumbs />
//           {children}
//           <Footer />
//         </Container>
//       </Box>
//     </Box>
//   );
// }
