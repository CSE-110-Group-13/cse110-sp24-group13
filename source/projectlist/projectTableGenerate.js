// import {
//   getProjectTableFromStorage,
//   saveProjectTableToStorage,
//   getProjectFromTable,
//   saveProjectToTable,
//   deleteProjectFromTable,
//   createNewProjectObject,
//   modifyProjectTitle,
//   modifyProjectDescription,
//   appendTaskToProjectTaskList,
//   removeTaskFromProjectTaskList,
//   modifyProjectDeadline,
//   modifyProjectPriority,
//   modifyProjectDateCreated,
//   appendCompletedTaskToProject,
//   removeCompletedTaskFromProject
// } from "../backend/ProjectTable.js"

// import {
//   getNoteTableFromStorage,
//   saveNoteTableToStorage,
//   getNoteFromTable, 
//   saveNoteToTable, 
//   deleteNoteFromTable, 
//   createNewNoteObject, 
//   modifyNoteText, 
//   modifyNoteDate, 
//   modifyNoteLastEdited, 
//   modifyNoteTitle, 
//   // appendProjectToNoteProjectList, 
//   // removeProjectFromNoteProjectList, 
//   modifyNoteFavorited, 
//   appendTagToNoteTags, 
//   removeTagFromNoteTags
// } from "../backend/NoteTable.js"

// import {
//   getTaskTableFromStorage,
//   saveTaskTableToStorage,
//   getTaskFromTable,
//   saveTaskToTable,
//   deleteTaskFromTable,
//   createNewTaskObject,
//   modifyTaskName,
//   modifyTaskCompleted
// } from "../backend/TaskTable.js"

// window.addEventListener("DOMContentLoaded", init);

// function init() {
//   const projectTable = getProjectTableFromStorage();
//   const noteTable = getNoteTableFromStorage();
//   const taskTable = getTaskTableFromStorage();

//   // createNewNoteObject("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent auctor massa at nunc gravida, sit amet faucibus eros facilisis. Suspendisse potenti. Phasellus sit amet neque at quam elementum euismod a sed erat. Curabitur auctor enim nec magna pharetra, non cursus metus pretium. Fusce sed turpis id nunc ullamcorper gravida ac a erat. Morbi aliquam orci in ante pretium, et egestas justo dapibus. Ut ac dignissim urna. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras nec ornare purus. Vestibulum suscipit fermentum erat, in gravida nulla tincidunt a. Duis euismod libero id bibendum tempor. Sed mollis purus ut neque scelerisque, id lobortis purus porttitor. Integer volutpat, nunc nec pellentesque feugiat, urna ligula congue lorem, ac vulputate turpis sapien in felis. Etiam vel felis sit amet erat dignissim tincidunt a ut ante.Sed quis risus nec turpis dignissim fermentum. Suspendisse potenti. Aliquam a dui lacus. Nulla in dignissim lectus. Nam aliquet lacus ut metus congue, a ullamcorper eros iaculis. Phasellus nec arcu et nunc venenatis gravida non ac erat. In dictum, metus ut congue bibendum, elit lacus vulputate erat, eget facilisis sem ante sit amet velit. Quisque dapibus dui ac velit bibendum, sit amet tincidunt leo vulputate. Mauris tincidunt dui ac felis tincidunt, vel scelerisque lorem faucibus. Donec euismod ex ut felis eleifend, a tristique tortor aliquam. In ut magna ut metus venenatis tempus. Vivamus dictum est ut eros congue, vel vestibulum dolor luctus. Praesent non nibh et odio interdum suscipit ac id ante. Cras feugiat justo id libero accumsan, ac vestibulum magna tincidunt. Nullam sit amet tincidunt augue. In elementum lacus vel erat ullamcorper, id feugiat turpis facilisis. Curabitur at nisi in urna aliquam scelerisque. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.Integer ac lacus dolor. Vivamus vitae felis nec felis pellentesque feugiat ac a odio. Vestibulum rhoncus metus at sapien ultricies, eget efficitur magna congue. Phasellus sed ante justo. Donec aliquam nisi et gravida gravida. Aliquam auctor lorem id urna tincidunt viverra. Nulla facilisi. Sed aliquam sapien id tincidunt gravida. Curabitur interdum, tortor nec efficitur dapibus, felis velit blandit nisl, a bibendum elit lorem sed est. Duis venenatis metus eu lacus laoreet feugiat. Nam et enim eu sapien faucibus tristique", "2026-05-28", "2026-05-29", "this is title1", "project1", true, ["tag1", "tag2", "tag3"]);

//   // if (Object.keys(noteTable).length < 10) {
//   //   for(let i = 0; i < 9; i++){
//   //   createNewNoteObject("this is text1", "2025-05-28", "2024-05-28", "this is title1", "project1", true, ["tag1", "tag2", "tag3"]);
//   //   // createNewNoteObject("this is text2", "2024-05-29", "2024-05-30", "this is title2", ["project1", "project2"], false, ["tag1", "tag2", "tag3"]);
//   //   // createNewNoteObject("this is text3", "2024-05-29", "2024-05-30", "this is title3", ["project1", "project2"], true, ["tag1", "tag2", "tag3"]);
//   //   // createNewNoteObject("this is text4", "2024-05-29", "2024-05-30", "this is title4", ["project1", "project2"], false, ["tag1", "tag2", "tag3"]);
//   //   // createNewNoteObject("this is text5", "2024-05-29", "2024-05-31", "this is title5", ["project1", "project2"], true, ["tag1", "tag2", "tag3"]);
//   //   }
//   // }
//   if (Object.keys(taskTable).length < 2) {
//     createNewTaskObject("do stuffLorem ipsum blah blah do this blah lorem", true);
//     createNewTaskObject("do stuff2Lorem ipsum blah blah do this blah lorem", false);
//   }

//   if (Object.keys(projectTable).length < 3) {
//     let newTaskTable = getTaskTableFromStorage();
//     let aTask = Object.values(newTaskTable)[0];
//     let aTask2 = Object.values(newTaskTable)[1];
//     /**
//      * Each project object in the table is in the format:
//      * {
//      *    "projectID" : "",
//      *    "title" : "",
//      *    "description" : "",
//      *    "taskList" : [],
//      *    "deadline" : "", 
//      *    "priority" : ""
//      *    "dateCreated" : "",
//      *    "tasksCompleted" : [],
//      *    "linkedNotes" : [],
//      *    "lastWorkedOn" : "",  
//      * }
//      */
//     createNewProjectObject("Project1", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", [`${aTask.taskID}`, `${aTask2.taskID}`], "2024-06-14", "low", "2024-06-30", [`${aTask.taskID}`], [], "2024-05-31");
//     createNewProjectObject("Project1", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", [`${aTask.taskID}`, `${aTask2.taskID}`], "2024-06-15", "low", "2024-06-30", [`${aTask.taskID}`], [], "2025-05-31");
//     createNewProjectObject("Project1", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", [`${aTask.taskID}`, `${aTask2.taskID}`], "2024-06-13", "low", "2024-06-30", [`${aTask.taskID}`], [], "2024-05-31");
//     // createNewProjectObject("Project2", "Description2", ['task1', 'task2', 'task3'], "2024-05-30", "Priority2");
//     // createNewProjectObject("Project3", "Description3", ['task1', 'task2', 'task3'], "2024-05-30", "Priority3");
//     // createNewProjectObject("Project3", "Description3", ['task1', 'task2', 'task3'], "2024-05-30", "Priority3");
//     // createNewProjectObject("Project3", "Description3", ['task1', 'task2', 'task3'], "2024-05-30", "Priority3");
//     // createNewProjectObject("Project3", "Description3", ['task1', 'task2', 'task3'], "2024-05-30", "Priority3");
//   }
//   if (Object.keys(noteTable).length < 3) {
//     let newProjectTable = getProjectTableFromStorage();
//     let aProject = Object.values(newProjectTable)[0];
//     for(let i = 0; i < 2; i++){
//     createNewNoteObject("this is text1", "2024-05-14", "2024-05-14", "this is title1", `${aProject.projectID}`, true, ["tag1", "tag2", "tag3"]);
//     // createNewNoteObject("this is text2", "2024-05-29", "2024-05-30", "this is title2", ["project1", "project2"], false, ["tag1", "tag2", "tag3"]);
//     // createNewNoteObject("this is text3", "2024-05-29", "2024-05-30", "this is title3", ["project1", "project2"], true, ["tag1", "tag2", "tag3"]);
//     // createNewNoteObject("this is text4", "2024-05-29", "2024-05-30", "this is title4", ["project1", "project2"], false, ["tag1", "tag2", "tag3"]);
//     // createNewNoteObject("this is text5", "2024-05-29", "2024-05-31", "this is title5", ["project1", "project2"], true, ["tag1", "tag2", "tag3"]);
//     }
//   }
// }