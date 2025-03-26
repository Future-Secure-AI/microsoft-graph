// import createWorkbookSession from "../operations/workbookSession/createWorkbookSession.ts";
// import closeWorkbookSession from "../operations/workbookSession/closeWorkbookSession.ts";

// const withSession = async () => {
// 	const filehandle = await open(path, "r");

// 	return {
// 		filehandle,
// 		[Symbol.asyncDispose]: async () => {
// 			await filehandle.close();
// 		},
// 	};
// };

// {
// 	await using file = await getFileHandle("thefile.txt");

// 	// Do stuff with file.filehandle

// } // Automatically disposed!
