import express from "express";
import { IPOTYPES } from "types/@types";
import {
  addPostIdToIPOByIPOId,
  createNewIPO,
  deleteIPOById,
  findAllIPO,
  findIPOAndUpdate,
  findIPObyId,
  findIPObyName,
  getIPOByUserId,
  getIPOByUserName,
  removePostIdFromIPOByIPOId,
} from "../db/models/ipoModels";
import {
  createInternalServerErrorResponse,
  mapAPIResponseToDBResponse,
} from "../tools/apiResponse";
import { DATABASE_CODE_ENUM } from "../tools/databaseResponseCodes";

// create new IPO
export async function createIPO(req: express.Request, res: express.Response) {
  try {
    const {
      category,
      dates,
      exPremium,
      linkedPostsId,
      logo,
      lotSize,
      name,
      offerPrice,
      status,
      subscription,
      allotmentLink,
      allotmentStatus,
      ipoPhase,
      createdBy,
    }: IPOTYPES = req.body.ipo;

    // const result = await createNewIPO({
    //   category,
    //   dates,
    //   exPremium,
    //   linkedPostsId,
    //   logo,
    //   lotSize,
    //   name,
    //   offerPrice,
    //   status,
    //   subscription,
    //   allotmentLink,
    //   allotmentStatus,
    //   ipoPhase,
    //   createdBy,
    // });
    // if (result.operation == "success") {
    //   res.status(201).json({
    //     result,
    //   });
    // } else {
    //   res.status(200).json({ result });
    // }

    const createNewIPOResponse = await createNewIPO({
      category,
      dates,
      exPremium,
      linkedPostsId,
      logo,
      lotSize,
      name,
      offerPrice,
      status,
      subscription,
      allotmentLink,
      allotmentStatus,
      ipoPhase,
      createdBy,
    });

    if (createNewIPOResponse.success && createNewIPOResponse.result) {
      return res
        .status(200)
        .json(mapAPIResponseToDBResponse({ dbResponse: createNewIPOResponse }));
    } else {
      return res
        .status(400)
        .json(mapAPIResponseToDBResponse({ dbResponse: createNewIPOResponse }));
    }
  } catch (error) {
    // res.status(500).json({
    //   message: "Internal Server Error.",
    //   error,
    // });
    return res.status(500).json(createInternalServerErrorResponse(error));
  }
}

// get IPO
// by id
export async function getIPOById(req: express.Request, res: express.Response) {
  try {
    // const { id }: { id: string } = req.body;
    // const result = await findIPObyId(id);
    // if (result.operation == "success") {
    //   res.status(200).json({ result });
    // } else if (result.operation == "fail") {
    //   res.status(202).json({ result });
    // } else if (result.operation == "error") {
    //   res.status(400).json({ result });
    // }
    const { id }: { id: string } = req.body;
    const findIPObyIdResponse = await findIPObyId(id);

    const { success, result } = findIPObyIdResponse;

    // success & result
    if (success && result) {
      return res
        .status(200)
        .json(mapAPIResponseToDBResponse({ dbResponse: findIPObyIdResponse }));
    }
    // error & null result
    else if (!success && !result) {
      return res
        .status(400)
        .json(mapAPIResponseToDBResponse({ dbResponse: findIPObyIdResponse }));
    }
    // error & error result
    else if (!success && result) {
      return res
        .status(400)
        .json(mapAPIResponseToDBResponse({ dbResponse: findIPObyIdResponse }));
    }
  } catch (error) {
    // res.status(500).json({
    //   message: "Internal Server Error.",
    //   error,
    // });
    return res.status(500).json(createInternalServerErrorResponse(error));
  }
}

// by name
export async function getIPOByName(
  req: express.Request,
  res: express.Response
) {
  try {
    // const { name }: { name: string } = req.body;
    // const result = await findIPObyName(name);
    // if (result.operation == "success") {
    //   res.status(200).json({ result });
    // } else if (result.operation == "fail") {
    //   res.status(202).json({ result });
    // } else if (result.operation == "error") {
    //   res.status(400).json({ result });
    // }

    const { name }: { name: string } = req.body;
    const findIPOByNameResponse = await findIPObyName(name);

    const { success, result } = findIPOByNameResponse;

    // success & result
    if (success && result) {
      return res
        .status(200)
        .json(
          mapAPIResponseToDBResponse({ dbResponse: findIPOByNameResponse })
        );
    }
    // error & null result
    else if (!success && !result) {
      return res
        .status(400)
        .json(
          mapAPIResponseToDBResponse({ dbResponse: findIPOByNameResponse })
        );
    }
    // error & error result
    else if (!success && result) {
      return res
        .status(400)
        .json(
          mapAPIResponseToDBResponse({ dbResponse: findIPOByNameResponse })
        );
    }
  } catch (error) {
    // res.status(500).json({
    //   message: "Internal Server Error.",
    //   error,
    // });
    return res.status(500).json(createInternalServerErrorResponse(error));
  }
}

// get ipo created by userName
export async function getIPOCreatedByUserName(
  req: express.Request,
  res: express.Response
) {
  try {
    // const { userName }: { userName: string } = req.body;
    // const result = await getIPOByUserName(userName);
    // if (result.operation == "success") {
    //   res.status(200).json({ result });
    // } else if (result.operation == "fail") {
    //   res.status(202).json({ result });
    // } else if (result.operation == "error") {
    //   res.status(400).json({ result });
    // }
    const { userName }: { userName: string } = req.body;
    const getIPOByUserNameResponse = await getIPOByUserName(userName);

    const { success, result } = getIPOByUserNameResponse;

    // success & result
    if (success && result) {
      return res
        .status(200)
        .json(
          mapAPIResponseToDBResponse({ dbResponse: getIPOByUserNameResponse })
        );
    }
    // error & null result
    else if (!success && !result) {
      return res
        .status(400)
        .json(
          mapAPIResponseToDBResponse({ dbResponse: getIPOByUserNameResponse })
        );
    }
    // error & error result
    if (!success && result) {
      return res
        .status(400)
        .json(
          mapAPIResponseToDBResponse({ dbResponse: getIPOByUserNameResponse })
        );
    }
  } catch (error) {
    // res.status(500).json({
    //   message: "Internal Server Error.",
    //   error,
    // });
    return res.status(500).json(createInternalServerErrorResponse(error));
  }
}
// get ipo created by userId
export async function getIPOCreatedByUserId(
  req: express.Request,
  res: express.Response
) {
  try {
    // const { userId } = req.body;
    // const result = await getIPOByUserId(userId);
    // if (result.operation == "success") {
    //   res.status(200).json({ result });
    // } else if (result.operation == "fail") {
    //   res.status(202).json({ result });
    // } else if (result.operation == "error") {
    //   res.status(400).json({ result });
    // }
    const { userId } = req.body;
    const getIPOByUserIdResponse = await getIPOByUserId(userId);

    const { success, result } = getIPOByUserIdResponse;

    // success & result
    if (success && result) {
      return res
        .status(200)
        .json(
          mapAPIResponseToDBResponse({ dbResponse: getIPOByUserIdResponse })
        );
    }
    // error & null result
    else if (!success && !result) {
      return res
        .status(400)
        .json(
          mapAPIResponseToDBResponse({ dbResponse: getIPOByUserIdResponse })
        );
    }
    // error & error response
    else if (!success && result) {
      return res
        .status(400)
        .json(
          mapAPIResponseToDBResponse({ dbResponse: getIPOByUserIdResponse })
        );
    }
  } catch (error) {
    // res.status(500).json({
    //   message: "Internal Server Error.",
    //   error,
    // });
    return res.status(500).json(createInternalServerErrorResponse(error));
  }
}

// update
// update IPO whole
export async function updateIPO(req: express.Request, res: express.Response) {
  try {
    // const { id, ipoUpdate }: { id: string; ipoUpdate: IPOTYPES } = req.body;

    // const result = await findIPOAndUpdate({ id, ipoUpdate });

    // if (result.operation === "success") {
    //   res.status(201).json({
    //     result,
    //   });
    // } else if (result.operation === "fail") {
    //   res.status(202).json({
    //     result,
    //   });
    // }
    const { id, ipoUpdate }: { id: string; ipoUpdate: IPOTYPES } = req.body;

    const findIPOAndUpdateResponse = await findIPOAndUpdate({ id, ipoUpdate });

    const { success, result } = findIPOAndUpdateResponse;

    // success & result
    if (success && result) {
      return res
        .status(200)
        .json(
          mapAPIResponseToDBResponse({ dbResponse: findIPOAndUpdateResponse })
        );
    }
    // error & null result
    else if (!success && !result) {
      return res
        .status(400)
        .json(
          mapAPIResponseToDBResponse({ dbResponse: findIPOAndUpdateResponse })
        );
    }
    // error & error result
    else if (!success && result) {
      return res
        .status(400)
        .json(
          mapAPIResponseToDBResponse({ dbResponse: findIPOAndUpdateResponse })
        );
    }
  } catch (error) {
    // res.status(500).json({
    //   message: "Internal Server Error.",
    //   error,
    // });
    return res.status(500).json(createInternalServerErrorResponse(error));
  }
}

// add post Id to IPO
export async function addPostIdToIPO(
  req: express.Request,
  res: express.Response
) {
  try {
    // const { postId, ipoId }: { postId: string; ipoId: string } = req.body;
    // const result = await addPostIdToIPOByIPOId(postId, ipoId);
    // if (result.operation === "success") {
    //   res.status(201).json({ result });
    // } else if (result.operation === "duplicate") {
    //   res.status(202).json({ result });
    // } else if (result.operation === "fail") {
    //   res.status(200).json({ result });
    // }

    const { postId, ipoId }: { postId: string; ipoId: string } = req.body;
    const addPostIdToIPOByIPOIdResponse = await addPostIdToIPOByIPOId(
      postId,
      ipoId
    );

    const { success, result, responseCode } = addPostIdToIPOByIPOIdResponse;

    // success & result
    if (success && result) {
      return res.status(200).json(
        mapAPIResponseToDBResponse({
          dbResponse: addPostIdToIPOByIPOIdResponse,
        })
      );
    }
    // duplicate error & null result
    if (
      !success &&
      !result &&
      responseCode ===
        DATABASE_CODE_ENUM.DB_IPO_CARDS_UPDATE_POST_ID_ADD_BY_IPO_ID_DUPLICATE_ERROR
    ) {
      return res.status(400).json(
        mapAPIResponseToDBResponse({
          dbResponse: addPostIdToIPOByIPOIdResponse,
        })
      );
    }
    // error & null result (ipo not present)
    else if (!success && !result) {
      return res.status(400).json(
        mapAPIResponseToDBResponse({
          dbResponse: addPostIdToIPOByIPOIdResponse,
        })
      );
    }
    // error & error result
    else if (!success && result) {
      return res.status(200).json(
        mapAPIResponseToDBResponse({
          dbResponse: addPostIdToIPOByIPOIdResponse,
        })
      );
    }
  } catch (error) {
    // res.status(500).json({
    //   message: "Internal Server Error.",
    //   error,
    // });
    return res.status(500).json(createInternalServerErrorResponse(error));
  }
}

// delete postId from the IPO
export async function deletePostIdFromIPO(
  req: express.Request,
  res: express.Response
) {
  try {
    // const { postId, ipoId }: { postId: string; ipoId: string } = req.body;
    // const result = await removePostIdFromIPOByIPOId(postId, ipoId);
    // if (result.operation === "success") {
    //   res.status(201).json({ result });
    // } else if (result.operation === "fail") {
    //   res.status(200).json({ result });
    // } else if (result.operation === null) {
    //   res.status(202).json({ result });
    // }

    const { postId, ipoId }: { postId: string; ipoId: string } = req.body;
    const removePostIdFromIPOByIPOIdResponse = await removePostIdFromIPOByIPOId(
      postId,
      ipoId
    );

    const { success, result, responseCode } =
      removePostIdFromIPOByIPOIdResponse;

    // success & result
    if (success && result) {
      return res.status(200).json(
        mapAPIResponseToDBResponse({
          dbResponse: removePostIdFromIPOByIPOIdResponse,
        })
      );
    }
    // error & null result (post id not present in ipo)
    else if (
      !success &&
      !result &&
      responseCode ===
        DATABASE_CODE_ENUM.DB_IPO_CARDS_UPDATE_POST_ID_REMOVE_BY_IPO_ID_MISSING_ERROR
    ) {
      return res.status(400).json(
        mapAPIResponseToDBResponse({
          dbResponse: removePostIdFromIPOByIPOIdResponse,
        })
      );
    }
    // error & null request (ipo does not exits)
    else if (!success && !result) {
      return res.status(400).json(
        mapAPIResponseToDBResponse({
          dbResponse: removePostIdFromIPOByIPOIdResponse,
        })
      );
    }
    // error & error result
    else if (!success && result) {
      return res.status(400).json(
        mapAPIResponseToDBResponse({
          dbResponse: removePostIdFromIPOByIPOIdResponse,
        })
      );
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error.",
      error,
    });
  }
}

// delete IPO
export async function deleteIPO(req: express.Request, res: express.Response) {
  try {
    // const { ipoId }: { ipoId: string } = req.body;
    // const result = await deleteIPOById(ipoId);
    // if (result.operation === "success") {
    //   res.status(200).json({ result });
    // } else if (result.operation === "fail") {
    //   res.status(202).json({ result });
    // }
    const { ipoId }: { ipoId: string } = req.body;

    const deleteIPOByIdResponse = await deleteIPOById(ipoId);

    const { success, result } = deleteIPOByIdResponse;

    // success & result
    if (success && result) {
      return res
        .status(200)
        .json(
          mapAPIResponseToDBResponse({ dbResponse: deleteIPOByIdResponse })
        );
    }
    // error & null result
    else if (!success && !result) {
      return res
        .status(400)
        .json(
          mapAPIResponseToDBResponse({ dbResponse: deleteIPOByIdResponse })
        );
    }
    // error & error result
    else if (!success && result) {
      return res
        .status(400)
        .json(
          mapAPIResponseToDBResponse({ dbResponse: deleteIPOByIdResponse })
        );
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error.",
      error,
    });
  }
}

// get all the IPO
export async function getAllIPO(req: express.Request, res: express.Response) {
  try {
    // const result = await findAllIPO();
    // if (result.operation == "success") {
    //   res.status(200).json({ result });
    // } else if (result.operation == "fail") {
    //   res.status(202).json({ result });
    // } else if (result.operation == "error") {
    //   res.status(404).json({ result });
    // }
    const findAllIPOResponse = await findAllIPO();
    const { success, result } = findAllIPOResponse;

    // success && result
    if (success && result) {
      return res.status(200).json(
        mapAPIResponseToDBResponse({
          dbResponse: findAllIPOResponse,
        })
      );
    }
    // error & null result
    else if (!success && !result) {
      return res
        .status(400)
        .json(mapAPIResponseToDBResponse({ dbResponse: findAllIPOResponse }));
    }
    // error & error result
    else if (!success && result) {
      return res
        .status(400)
        .json(mapAPIResponseToDBResponse({ dbResponse: findAllIPOResponse }));
    }
  } catch (error) {
    // res.status(500).json({
    //   message: "Internal Server Error.",
    //   error,
    // });
    return res.status(500).json(createInternalServerErrorResponse(error));
  }
}
