import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {createClient, createEmployee} from "../../redux/action/user";
import {
  Divider,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  DialogActions,
  TextField,
} from "@mui/material";
import { PiNotepad, PiXLight } from "react-icons/pi";
import {Controller, useForm} from "react-hook-form";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const employeeDefaultValues = {
  firstName: "",
  lastName: "",
  username: "",
  password: "",
  phone: "",
  email: "",
}

const clientDefaultValues = {
  firstName: "",
  lastName: "",
  username: "",
  phone: "",
  email: "",
}

const CreateUser = ({ open, setOpen, scroll, type = "employee" }) => {
  //////////////////////////////////////// VARIABLES /////////////////////////////////////
  const { isFetching } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const entity = type === 'client' ? 'Client' : 'Employee'
  const { reset, control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: type === 'client' ? clientDefaultValues : employeeDefaultValues,
  })

  const onSubmit = async (data) => {
    try {
      if (entity === "Client") {
        await dispatch(createClient(data, setOpen));
      } else {
        await dispatch(createEmployee(data, setOpen));
      }
      reset();
    } catch (error) {
      console.error(`Failed to create ${entity}`, error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    reset()
  };

  return (
    <div>
      <Dialog
        scroll={scroll}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        fullWidth="sm"
        maxWidth="sm"
        aria-describedby="alert-dialog-slide-description">
        <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle className="flex items-center justify-between">
          <div className="text-sky-400 font-primary">Add New {entity}</div>
          <div className="cursor-pointer" onClick={handleClose}>
            <PiXLight className="text-[25px]" />
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="flex flex-col gap-2 p-3 text-gray-500 font-primary">
            <div className="text-xl flex justify-start items-center gap-2 font-normal">
              <PiNotepad size={23} />
              <span>{entity} Details</span>
            </div>
            <Divider />
                <table className="mt-4">
                    <tbody>
                    <tr>
                      <td className="pb-4 text-lg">First Name </td>
                      <td className="pb-4">
                        <Controller
                            name="firstName"
                            control={control}
                            rules={{
                              required: "First Name is required",
                              minLength: { value: 2, message: "First Name must be at least 2 characters" },
                              maxLength: { value: 20, message: "First Name must be at most 20 characters" },
                              validate: (v) =>
                                  v.trim() !== "" || "First name cannot be only spaces",
                            }}
                            render={({ field }) => <div>
                              <TextField size="small" fullWidth {...field}/>
                              {errors[field.name] && (
                                  <div style={{ color: "crimson", fontSize: 12 }}>
                                    {errors[field.name].message}
                                  </div>
                              )}
                            </div>
                            }
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="pb-4 text-lg">Last Name </td>
                      <td className="pb-4">
                        <Controller
                            name="lastName"
                            control={control}
                            rules={{
                              required: "Last Name is required",
                              minLength: { value: 2, message: "Last Name must be at least 2 characters" },
                              maxLength: { value: 20, message: "Last Name must be at most 20 characters" },
                              validate: (v) =>
                                  v.trim() !== "" || "Last name cannot be only spaces",
                            }}
                            render={({ field }) => <div>
                              <TextField size="small" fullWidth {...field}/>
                              {errors[field.name] && (
                                  <div style={{ color: "crimson", fontSize: 12 }}>
                                    {errors[field.name].message}
                                  </div>
                              )}
                            </div>
                            }
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="pb-4 text-lg">User Name </td>
                      <td className="pb-4">
                        <Controller
                            name="username"
                            control={control}
                            rules={{
                              required: "Username is required",
                              minLength: { value: 2, message: "Username must be at least 2 characters" },
                              maxLength: { value: 20, message: "Username must be at most 20 characters" },
                              validate: (v) =>
                                  v.trim() !== "" || "Username cannot be only spaces",
                            }}
                            render={({ field }) => <div>
                              <TextField size="small" fullWidth {...field}/>
                              {errors[field.name] && (
                                  <div style={{ color: "crimson", fontSize: 12 }}>
                                    {errors[field.name].message}
                                  </div>
                              )}
                             </div>
                            }
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="pb-4 text-lg">Email </td>
                      <td className="pb-4">
                        <Controller
                            name="email"
                            control={control}
                            rules={{
                              required: entity === "Client" ? "Email is required" : false,
                              pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Enter a valid email address",
                              },
                            }}
                            render={({ field }) => <div>
                              <TextField placeholder={entity === "Employee" && "Optional"} type="email" size="small" fullWidth {...field}/>
                              {errors[field.name] && (
                                  <div style={{ color: "crimson", fontSize: 12 }}>
                                    {errors[field.name].message}
                                  </div>
                              )}
                            </div>
                            }
                        />
                      </td>
                    </tr>
                  {
                    entity === 'Employee' &&  <tr>
                        <td className="flex items-start pt-2 text-lg">Password </td>
                        <td className="pb-4">
                          <Controller
                              name="password"
                              control={control}
                              rules={{
                                required: "Password is required",
                                minLength: { value: 2, message: "Password must be at least 2 characters" },
                                maxLength: { value: 20, message: "Password must be at most 20 characters" },
                                validate: (v) =>
                                    v.trim() !== "" || "Password cannot be only spaces",
                              }}
                              render={({ field }) => <div>
                                <TextField type="password" size="small" fullWidth {...field}/>
                                {errors[field.name] && (
                                    <div style={{ color: "crimson", fontSize: 12 }}>
                                      {errors[field.name].message}
                                    </div>
                                )}
                              </div>
                              }
                          />
                        </td>
                      </tr>
                  }
                    <tr>
                      <td className="flex items-start pt-2 text-lg">Phone </td>
                      <td className="pb-4">
                        <Controller
                            name="phone"
                            control={control}
                            rules={{
                              required: "Phone number is required",
                              pattern: {
                                value: /^[0-9]+$/,
                                message: "Only numeric characters are allowed",
                              },
                            }}
                            render={({ field }) => <div>
                              <TextField type="number" size="small" fullWidth {...field}/>
                              {errors[field.name] && (
                                  <div style={{ color: "crimson", fontSize: 12 }}>
                                    {errors[field.name].message}
                                  </div>
                              )}
                            </div>
                            }
                        />
                      </td>
                    </tr>
                    </tbody>
                </table>
          </div>
        </DialogContent>
        <DialogActions>
          <button
            onClick={handleClose}
            type="reset"
            className="bg-[#d7d7d7] px-4 py-2 rounded-lg text-gray-500 mt-4 hover:text-white hover:bg-[#6c757d] border-[2px] border-[#efeeee] hover:border-[#d7d7d7] font-thin transition-all">
            Cancel
          </button>
          <button
            type="submit"
            className="bg-primary-red px-4 py-2 rounded-lg text-white mt-4 hover:bg-red-400 font-thin">
            {isFetching ? 'Submitting...' : 'Submit'}
          </button>
        </DialogActions>
        </form>
      </Dialog>
    </div>

  );
};

export default CreateUser;
