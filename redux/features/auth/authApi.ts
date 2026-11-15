import { baseApi } from "../../api/baseApi";
import { TAddress, TUser, UserRole } from "./authSlice";

// Standard Common API Response wrapper matching backend sendResponse format
export type CommonResponse<T = null> = {
    statusCode?: number;
    success: boolean;
    message: string;
    data: T;
};

// Authentication Data (User + Access Token)
export type TAuthResponseData = {
    user: TUser;
    accessToken: string;
};

// Login Request
export type TLoginRequest = {
    email: string;
    password: string;
};

// Register Request
export type TRegisterRequest = {
    name: string;
    email: string;
    password: string;
    role?: UserRole;
    phone?: string;
    profileImage?: string;
    presentAddress?: TAddress;
    permanentAddress?: TAddress;
    referredBy?: string | null;
};

// Referral Validation Response
export type TValidateReferralData = {
    valid: boolean;
    referralCode: string;
    referrerId: string;
    referrerName: string;
};

// Forgot Password & OTP
export type TForgotPasswordRequest = {
    email: string;
};

export type TVerifyOtpRequest = {
    email: string;
    otp: string;
};

export type TVerifyOtpResponseData = {
    token: string;
};

export type TResendOtpRequest = {
    email: string;
};

export type TResetPasswordRequest = {
    token: string;
    newPassword: string;
};

// Email Verification
export type TVerifyEmailParams = {
    email: string;
    token?: string;
    otp?: string;
};

export type TResendVerificationEmailRequest = {
    email: string;
};

// Profile & Account Management
export type TUpdateProfileRequest = {
    name?: string;
    phone?: string;
    profileImage?: string;
    language?: string;
    presentAddress?: TAddress;
    permanentAddress?: TAddress;
    hasHome?: boolean;
    hasStay?: boolean;
    hasTurf?: boolean;
    hasProperty?: boolean;
};

export type TChangePasswordRequest = {
    currentPassword: string;
    newPassword: string;
};

export type TUpdateEmailRequest = {
    email: string;
    password: string;
};

export type TVerifyNewEmailParams = {
    email: string;
    token: string;
};

export type TResendEmailUpdateRequest = {
    password: string;
};

export const authApi = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        // === Core Authentication ===
        login: builder.mutation<CommonResponse<TAuthResponseData>, TLoginRequest>({
            query: (userInfo) => ({
                url: "/auth/login",
                method: "POST",
                body: userInfo,
                credentials: "include",
            }),
            invalidatesTags: ["User"],
        }),

        register: builder.mutation<CommonResponse<TAuthResponseData>, TRegisterRequest>({
            query: (userInfo) => ({
                url: "/auth/register",
                method: "POST",
                body: userInfo,
                credentials: "include",
            }),
            invalidatesTags: ["User"],
        }),

        refreshToken: builder.mutation<CommonResponse<TAuthResponseData>, void | { refreshToken?: string }>({
            query: (body) => ({
                url: "/auth/refresh-token",
                method: "POST",
                body,
                credentials: "include",
            }),
        }),

        logout: builder.mutation<CommonResponse<null>, void>({
            query: () => ({
                url: "/auth/logout",
                method: "POST",
                credentials: "include",
            }),
            invalidatesTags: ["User"],
        }),

        validateReferralCode: builder.query<CommonResponse<TValidateReferralData>, string>({
            query: (code) => ({
                url: `/auth/referral/${encodeURIComponent(code)}`,
                method: "GET",
            }),
        }),

        // === Password Reset ===
        forgotPassword: builder.mutation<CommonResponse<null>, TForgotPasswordRequest>({
            query: (body) => ({
                url: "/auth/forgot-password",
                method: "POST",
                body,
            }),
        }),

        verifyOtp: builder.mutation<CommonResponse<TVerifyOtpResponseData>, TVerifyOtpRequest>({
            query: (body) => ({
                url: "/auth/verify-otp",
                method: "POST",
                body,
            }),
        }),

        resendOtp: builder.mutation<CommonResponse<null>, TResendOtpRequest>({
            query: (body) => ({
                url: "/auth/resend-otp",
                method: "POST",
                body,
            }),
        }),

        resetPassword: builder.mutation<CommonResponse<null>, TResetPasswordRequest>({
            query: (body) => ({
                url: "/auth/reset-password",
                method: "POST",
                body,
            }),
        }),

        // === Email Verification ===
        verifyEmail: builder.query<CommonResponse<null>, TVerifyEmailParams>({
            query: ({ email, token, otp }) => ({
                url: "/auth/verify-email",
                method: "GET",
                params: { email, token, otp },
            }),
        }),

        resendVerificationEmail: builder.mutation<CommonResponse<null>, TResendVerificationEmailRequest>({
            query: (body) => ({
                url: "/auth/resend-verification",
                method: "POST",
                body,
            }),
        }),

        // === Profile & User Management ===
        getMe: builder.query<CommonResponse<TUser>, void>({
            query: () => ({
                url: "/auth/me",
                method: "GET",
                credentials: "include",
            }),
            providesTags: ["User"],
        }),

        updateProfile: builder.mutation<CommonResponse<TUser>, TUpdateProfileRequest>({
            query: (body) => ({
                url: "/auth/profile",
                method: "PATCH",
                body,
                credentials: "include",
            }),
            invalidatesTags: ["User"],
        }),

        changePassword: builder.mutation<CommonResponse<null>, TChangePasswordRequest>({
            query: (body) => ({
                url: "/auth/change-password",
                method: "POST",
                body,
                credentials: "include",
            }),
        }),

        updateEmail: builder.mutation<CommonResponse<null>, TUpdateEmailRequest>({
            query: (body) => ({
                url: "/auth/update-email",
                method: "POST",
                body,
                credentials: "include",
            }),
        }),

        verifyNewEmail: builder.query<CommonResponse<null>, TVerifyNewEmailParams>({
            query: ({ email, token }) => ({
                url: "/auth/verify-new-email",
                method: "GET",
                params: { email, token },
            }),
        }),

        resendEmailUpdate: builder.mutation<CommonResponse<null>, TResendEmailUpdateRequest>({
            query: (body) => ({
                url: "/auth/resend-email-update",
                method: "POST",
                body,
                credentials: "include",
            }),
        }),

        deleteAccount: builder.mutation<CommonResponse<null>, void>({
            query: () => ({
                url: "/auth/me",
                method: "DELETE",
                credentials: "include",
            }),
            invalidatesTags: ["User"],
        }),
    }),
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useRefreshTokenMutation,
    useLogoutMutation,
    useValidateReferralCodeQuery,
    useLazyValidateReferralCodeQuery,
    useForgotPasswordMutation,
    useVerifyOtpMutation,
    useResendOtpMutation,
    useResetPasswordMutation,
    useVerifyEmailQuery,
    useLazyVerifyEmailQuery,
    useResendVerificationEmailMutation,
    useGetMeQuery,
    useLazyGetMeQuery,
    useUpdateProfileMutation,
    useChangePasswordMutation,
    useUpdateEmailMutation,
    useVerifyNewEmailQuery,
    useLazyVerifyNewEmailQuery,
    useResendEmailUpdateMutation,
    useDeleteAccountMutation,
} = authApi;
