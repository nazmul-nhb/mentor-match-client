"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Form, Input, Button, message } from "antd";
import { useRouter } from "next/navigation";
import { GithubOutlined, GoogleOutlined } from "@ant-design/icons";

export default function LoginPage() {
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const onFinish = async (values: { email: string; password: string }) => {
		setLoading(true);
		const res = await signIn("credentials", {
			email: values.email,
			password: values.password,
			redirect: false,
		});

		setLoading(false);

		if (res?.error) {
			message.error(res.error);
		} else {
			message.success("Successfully Logged In!");
			router.push("/");
		}
	};

	return (
		<div className="flex items-center justify-center h-screen">
			<div className="p-6 bg-white rounded shadow-md">
				<h2 className="mb-4 text-center">Login</h2>
				<Form layout="vertical" onFinish={onFinish}>
					<Form.Item
						label="Email"
						name="email"
						rules={[{ required: true }]}
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
					<Form.Item>
						<Button
							type="primary"
							htmlType="submit"
							loading={loading}
							block
						>
							Log In
						</Button>
					</Form.Item>
				</Form>
				<div className="flex justify-between">
					<Button
						icon={<GithubOutlined />}
						onClick={() => signIn("github")}
						className="mr-2"
					>
						Login with GitHub
					</Button>
					<Button
						icon={<GoogleOutlined />}
						onClick={() => signIn("google")}
					>
						Login with Google
					</Button>
				</div>
			</div>
		</div>
	);
}
