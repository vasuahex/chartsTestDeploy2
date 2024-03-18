import toast from "react-hot-toast";

const openDatabase = () => {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open("CodeDB", 1);

    request.onerror = () => {
      reject("Error opening database");
    };

    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      db.createObjectStore("codeStore", { keyPath: "id" });
    };
  });
};

export const saveFileToMongoDB = async (bodyDetail: any) => {
  const newBody = bodyDetail.map((each: any) => { return { ...each, status: 'currentlyInUse', sourceName: 'firstFile', fileType: 'csv', description: 'description' } })
  // bodyDetail= [...bodyDetail, ]
  try {
    const res = await fetch("/api/saveSourceData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBody),
    });

    console.log('res saved', res);
    if (res.ok) {
      const responseBody = await res.json();
      console.log('res saved', responseBody);
      // toast.success("Data saved to DB.");
      toast.success(responseBody.message);

      // formik.resetForm();
      // router.push("/login");
    } else {
      toast.error("Data not saved to DB.");
    }
  } catch (error) {
    console.log("Data not saved to DB: ", error);
  }

}


export const saveSourceContent = async (content: any) => {
  const newBody = content.map((each: any) => { return { ...each, sourceName: 'firstFile', fileType: 'csv', description: 'description' } })
  try {
    const response = await fetch('/api/updateSourceData', { // Replace '/api/yourEndpoint' with your actual endpoint path
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        operationType: 'save',
        // contents: [{ fileName: 'New Content', SourceType: 'current', data: content }], // Example structure, adjust as needed
        contents: newBody
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to save content');
    }

    const result = await response.json();
    console.log('Save result:', result);
    // Handle success
  } catch (error) {
    console.error('Error saving content:', error);
    // Handle error
  }
};


export const renameSourceContent = async (contentId: any, newFileName: any) => {
  const updateData = { contentId, newFileName, newSourceType: 'newSourceType' }
  try {
    const response = await fetch('/api/updateSourceData', { // Replace '/api/yourEndpoint' with your actual endpoint path
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        operationType: 'update',
        updateType: 'renameContent', // or 'updateSourceType', depending on the operation
        ...updateData,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to update content');
    }

    const result = await response.json();
    console.log('Update result:', result);
    // Handle success
  } catch (error) {
    console.error('Error updating content:', error);
    // Handle error
  }
};


export const updateSourceStatus = async (contentId: any, newSourceStatus: any) => {
  const updateData = { contentId, newSourceStatus, }
  try {
    const response = await fetch('/api/updateSourceData', { // Replace '/api/yourEndpoint' with your actual endpoint path
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        operationType: 'update',
        updateType: 'renameContent', // or 'updateSourceType', depending on the operation
        ...updateData,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to update content');
    }

    const result = await response.json();
    console.log('Update result:', result);
    // Handle success
  } catch (error) {
    console.error('Error updating content:', error);
    // Handle error
  }
};

export const getContentById = async (contentId: any) => {
  // console.log('res contentById');

  try {
    const res = await fetch(`/api/getSourceDataById`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ contentId }),
      });

    // console.log('res saved',res);
    if (res.ok) {
      const responseBody = await res.json();
      console.log('res contentById', responseBody);

    } else {
      toast.error("Data not got  to DB.");
    }
  } catch (error) {
    console.log("Data not got to DB: ", error);
  }

}


export const updateDataItem = async ({ updateType, contentId, newFileName, newSourceType }: { updateType: string, contentId?: string, newFileName?: string, newSourceType?: string }) => {
  try {
    const response = await fetch('/api/updateSourceData', { // Adjust the URL based on your API route
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        updateType,
        contentId,
        newFileName,
        newSourceType,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to update data item');
    }
    console.log('Update successful:', data);
    return data;
  } catch (error: any) {
    console.error('Error updating data item:', error.message);
  }
}


// Function to call the renameContent API endpoint

export const renameContent = async (contentId: any, newFileName: any) => {
  // console.log('contentId',contentId,'newFileName',newFileName)

  try {
    const res = await fetch('/api/renameSourceData', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ contentId, newFileName }),
    });

    if (res.ok) {
      const responseBody = await res.json();
      console.log('Content rename response:', responseBody);
      // toast.success("Content renamed successfully.");
    } else {
      const errorBody = await res.json();
      // toast.error("Failed to rename content: " + errorBody.message);
      console.error('Failed to rename content:', errorBody.message);
    }
  } catch (error) {
    console.error('Error renaming content:', error);
    // toast.error("Error renaming content.");
  }
};




export const updateSourceType = async (contentId: any, newSourceType: any) => {
  const payload = { contentId, newSourceType }
  try {
    const res = await fetch("/api/updateSourceType", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    console.log('res saved', res);
    if (res.ok) {
      const responseBody = await res.json();
      console.log('res updated', responseBody);
      // toast.success("SourceType updated  to DB.");
      toast.success(responseBody.message);

      // formik.resetForm();
      // router.push("/login");
    } else {
      toast.error("Data not saved to DB.");
    }
  } catch (error) {
    console.log("Data not saved to DB: ", error);
  }

}

export const deleteSourceData = async (contentId: any) => {
  const payload = { contentId }
  try {
    const res = await fetch("/api/deleteSourceData", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    console.log('res saved', res);
    if (res.ok) {
      const responseBody = await res.json();
      console.log('res updated', responseBody);
      // toast.success("SourceType updated  to DB.");
      toast.success(responseBody.message);

      // formik.resetForm();
      // router.push("/login");
    } else {
      toast.error("Data not saved to DB.");
    }
  } catch (error) {
    console.log("Data not saved to DB: ", error);
  }

}



export const saveCodeToDB = async (id: any, code: any) => {
  // console.log('Saving code to DB with id:', id); 
  const db = await openDatabase();
  const transaction = db.transaction("codeStore", "readwrite");
  const store = transaction.objectStore("codeStore");
  const data = { id, code };

  return new Promise<any>((resolve, reject) => {
    const request = store.put(data);

    request.onerror = () => {
      reject("Error saving code to IndexedDB");
    };

    request.onsuccess = (event) => {
      console.log("event: " + event);

      resolve(data);
    };
  });
};

export const getCodeFromDB = async (id?: any) => {
  try {
    const res = await fetch("/api/getSourceData", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('res', res);
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'An error occurred while fetching the data.');
    }
    const data = await res.json();
    console.log('data', data);

    // return data.data.content[0]
  } catch (error) {
    console.log(error);
  }
  // const response = await fetch('/api/getSavedData');
  // console.log(response);




  const db = await openDatabase();
  const transaction = db.transaction("codeStore", "readonly");
  const store = transaction.objectStore("codeStore");
  const request = store.get(id);

  return new Promise<any | undefined>((resolve, reject) => {
    request.onerror = () => {
      reject("Error fetching code");
    };

    request.onsuccess = (event) => {
      const data = (event.target as IDBRequest).result;
      resolve(data ? data.code : undefined);
      // console.log("data", data);
    };
  });
};

export const getSourceContentById = async (contentId?: any) => {
  console.log('contentId', contentId)
  const baseUrl = "/api/getSourceData";
  const url = contentId ? `${baseUrl}/${contentId}` : baseUrl;
  console.log('contentId', url)
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        errorData.message || "An error occurred while fetching the data."
      );
    }
    const data = await res.json();
    // setCurrentUploadFileName(data.data.fileName);
    // setFilesUploadedData(data.data?.content);
    // const fileName = data.data.fileName;
  } catch (error) {
    console.log(error);
  }
};

export const getCodeFromMondoDB = async (dataItemId: any = null) => {
  const baseUrl = "/api/getSavedData"; // Replace '/api/yourEndpoint' with your actual endpoint
  const url = dataItemId ? `${baseUrl}?dataItemId=${dataItemId}` : baseUrl;

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('res', res);
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'An error occurred while fetching the data.');
    }
    const data = await res.json();
    console.log('data', data);

    // return data.data.content[0]
  } catch (error) {
    console.log(error);
  }
  // const response = await fetch('/api/getSavedData');
  // console.log(response);


  // const db = await openDatabase();
  // const transaction = db.transaction("codeStore", "readonly");
  // const store = transaction.objectStore("codeStore");
  // const request = store.get(dataItemId);

  // return new Promise<any | undefined>((resolve, reject) => {
  //   request.onerror = () => {
  //     reject("Error fetching code");
  //   };

  //   request.onsuccess = (event) => {
  //     const data = (event.target as IDBRequest).result;
  //     resolve(data ? data.code : undefined);
  //     // console.log("data", data);
  //   };
  // });
};

export const removeCodeFromDB = async (id: any) => {
  const db = await openDatabase();
  const transaction = db.transaction("codeStore", "readwrite");
  const store = transaction.objectStore("codeStore");

  return new Promise<void>((resolve, reject) => {
    const request = store.delete(id);

    request.onerror = () => {
      reject("Error removing code from IndexedDB");
    };

    request.onsuccess = () => {
      resolve();
    };
  });
};




// /* eslint-disable @typescript-eslint/no-explicit-any */
// const openDatabase = () => {
//   return new Promise<IDBDatabase>((resolve, reject) => {
//     const request = indexedDB.open("FileDB", 1);

//     request.onerror = () => {
//       reject("Error opening database");
//     };

//     request.onsuccess = (event) => {
//       const db = (event.target as IDBOpenDBRequest).result;
//       resolve(db);
//     };

//     request.onupgradeneeded = (event) => {
//       const db = (event.target as IDBOpenDBRequest).result;
//       db.createObjectStore("fileStore", { keyPath: "id", autoIncrement: true });
//     };
//   });
// };

// export const saveFileToDB = async (file: File) => {
//   const db = await openDatabase();
//   const transaction = db.transaction("fileStore", "readwrite");
//   const store = transaction.objectStore("fileStore");
//   const data = { file };

//   return new Promise<any>((resolve, reject) => {
//     const request = store.add(data);

//     request.onerror = () => {
//       reject("Error saving file to IndexedDB");
//     };

//     request.onsuccess = (event) => {
//       const fileId = (event.target as IDBRequest).result;
//       resolve({ fileId, file });
//     };
//   });
// };

// export const getFileFromDB = async (fileId: number) => {
//   const db = await openDatabase();
//   const transaction = db.transaction("fileStore", "readonly");
//   const store = transaction.objectStore("fileStore");
//   const request = store.get(fileId);

//   return new Promise<any | undefined>((resolve, reject) => {
//     request.onerror = () => {
//       reject("Error fetching file");
//     };

//     request.onsuccess = (event) => {
//       const data = (event.target as IDBRequest).result;
//       resolve(data ? data.file : undefined);
//     };
//   });
// };


export async function sendEmailThruApi({ email, emailType, token, code }: { email: any, emailType: any, token: any, code: any }) {
  try {
    const response = await fetch('/api/sendEmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        emailType,
        token,
        code,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to send email');
    }

    console.log('Email sent successfully:', data);
    // Additional success handling as needed
  } catch (error: any) {
    console.error('Error sending email:', error.message);
    // Additional error handling as needed
  }
}