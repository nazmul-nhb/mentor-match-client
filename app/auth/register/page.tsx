"use client";

import { useState } from "react";
import { Form, Input, Button, message, Select } from "antd"; // Import Select for role selection
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { IRegResponse, IUserDetails } from "@/app/types/interfaces";
import { mentorAPI } from "@/app/utilities/constants";

export default function RegisterPage() {
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const onFinish = async (values: IUserDetails) => {
		setLoading(true);
		try {
			const response = await axios.post<IRegResponse>(
				`${mentorAPI}/auth/register`,
				values
			);

			if (response.data.success) {
				message.success("Registered successfully");
				router.push("/auth/login");
			}
		} catch (error: unknown) {
			if (axios.isAxiosError(error)) {
				// Check if the error is an AxiosError
				const axiosError = error as AxiosError<IRegResponse>;
				message.error(
					axiosError.response?.data.message || "Registration failed"
				);
			} else {
				// For any other errors, just show a generic message
				message.error("Registration failed");
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex items-center justify-center h-screen">
			<div className="p-6 bg-white rounded shadow-md">
				<h2 className="mb-4 text-center">Register</h2>
				<Form layout="horizontal" onFinish={onFinish}>
					<Form.Item
						label="Name"
						name="name"
						rules={[{ required: true }]}
					>
						<Input />
					</Form.Item>

					<Form.Item
						label="Age"
						name="age"
						rules={[{ required: true }]} // Ensure age is a positive number
					>
						<Input type="number" />
					</Form.Item>

					<Form.Item
						label="Email"
						name="email"
						rules={[{ required: true, type: "email" }]} // Ensure email is valid
					>
						<Input type="email" />
					</Form.Item>

					<Form.Item
						label="Password"
						name="password"
						rules={[{ required: true }]}
					>
						<Input.Password />
					</Form.Item>

					<Form.Item
						label="Image URL"
						name="image"
						rules={[{ required: true }]}
					>
						<Input />
					</Form.Item>

					<Form.Item
						label="Role"
						name="role"
						rules={[{ required: true }]}
					>
						<Select placeholder="Select your role">
							<Select.Option value="student">
								Student
							</Select.Option>
							<Select.Option value="trainer">
								Trainer
							</Select.Option>
							<Select.Option value="admin">Admin</Select.Option>
						</Select>
					</Form.Item>

					<Form.Item>
						<Button
							type="primary"
							htmlType="submit"
							loading={loading}
							block
						>
							Register
						</Button>
					</Form.Item>
				</Form>
			</div>
		</div>
	);
}
