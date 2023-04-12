import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { ADD_CLIENT } from "../mutations/clientMutation";
import { GET_CLIENTS } from "../queries/clientQueries";

export default function AddClientModel() {
  const [buttonShow, setButtonShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [addClient] = useMutation(ADD_CLIENT, {
    variables: {
      name: name,
      email: email,
      phone: phone,
    },
    update(cache, { data: { addClient } }) {
      const { clients } = cache.readQuery({ query: GET_CLIENTS });
      cache.writeQuery({
        query: GET_CLIENTS,
        data: {
          clients: [...clients, addClient],
        },
      });
    },
  });

  function onSubmit(e) {
    e.preventDefault();
    addClient(name, email, phone);
    setButtonShow(false);
    setName("");
    setEmail("");
    setPhone("");
  }

  return (
    <>
      <button
        className="flex border-2 items-center justify-center border-red-100 px-5 py-2 rounded-md"
        onClick={() => setButtonShow(!buttonShow)}
      >
        <FaUser /> Add client
      </button>
      {buttonShow && (
        <div
          className="relative z-10 flex justify-center items-center h-full w-full"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <h3
                        className="text-base font-semibold leading-6 text-gray-900"
                        id="modal-title"
                      >
                        Add Client
                      </h3>
                      <div className="mt-2">
                        <form action="">
                          <div className="flex flex-col">
                            <input
                              type="text"
                              placeholder="Name"
                              onChange={(e) => setName(e.target.value)}
                              className="w-full m-2 rounded-lg border-2 border-gray-700 px-2 py-2"
                            />
                            <input
                              type="text"
                              placeholder="Email"
                              onChange={(e) => setEmail(e.target.value)}
                              className="w-full m-2 rounded-lg border-2 border-gray-700 px-2 py-2"
                            />
                            <input
                              type="text"
                              placeholder="Phone"
                              onChange={(e) => setPhone(e.target.value)}
                              className="w-full m-2 rounded-lg border-2 border-gray-700 px-2 py-2"
                            />
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="Submit"
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    onClick={onSubmit}
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setButtonShow(!buttonShow)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
