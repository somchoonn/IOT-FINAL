import { useNavigate } from "react-router-dom";
import Layout from "../components/layout";
import { Button, Container, Divider, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { notifications } from "@mantine/notifications";
import { Book } from "../lib/models";

export default function BookCreatePage() {
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);

  const bookCreateForm = useForm({
    initialValues: {
      title: "",
      author: "",
      category: "",
      details: "",
      synopsis: "",
    },
    validate: {
      title: isNotEmpty("กรุณากรอกให่้ครบ"),
      author: isNotEmpty("กรุณากรอกให่้ครบ"),
      category: isNotEmpty("กรุณากรอกให่้ครบ"),
      details: isNotEmpty("กรุณากรอกให่้ครบ"),
      synopsis: isNotEmpty("กรุณากรอกให่้ครบ"),
    },
  });

  const handleSubmit = async (values: typeof bookCreateForm.values) => {
    try {
      setIsProcessing(true);
      const response = await axios.post<{
        message: string;
        book: Book;
      }>(`/books`, values);
      notifications.show({
        title: "เพิ่มข้อมูลหนังสือสำเร็จ",
        message: "ข้อมูลหนังสือได้รับการเพิ่มเรียบร้อยแล้ว",
        color: "teal",
      });
      navigate(`/books/${response.data.book.id}`);
      // navigate(`/books`);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 400) {
          notifications.show({
            title: "ข้อมูลไม่ถูกต้อง",
            message: "กรุณาตรวจสอบข้อมูลที่กรอกใหม่อีกครั้ง",
            color: "red",
          });
        } else if (error.response?.status || 500 >= 500) {
          notifications.show({
            title: "เกิดข้อผิดพลาดบางอย่าง",
            message: "กรุณาลองใหม่อีกครั้ง",
            color: "red",
          });
        }
      } 

    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Layout>
        <Container className="mt-8">
          <h1 className="text-xl">เพิ่มหนังสือในระบบ</h1>

          <form onSubmit={bookCreateForm.onSubmit(handleSubmit)} className="space-y-8">
            <TextInput
              label="ชื่อหนังสือ"
              placeholder="ชื่อหนังสือ"
              {...bookCreateForm.getInputProps("title")}
            />

            <TextInput
              label="ชื่อผู้แต่ง"
              placeholder="ชื่อผู้แต่ง"
              {...bookCreateForm.getInputProps("author")}
            />

            <TextInput
              label="รายละเอียด"
              placeholder="รายละเอียด"
              {...bookCreateForm.getInputProps("details")}
            />
            <TextInput
              label="เรื่องย่อ"
              placeholder="เรื่องย่อ"
              {...bookCreateForm.getInputProps("synopsis")}
            />
            <TextInput
              label="หมวดหมู่"
              placeholder="หมวดหมู่"
              {...bookCreateForm.getInputProps("category")}
            />
           

            <Divider />

            <Button type="submit" loading={isProcessing}>
              บันทึกข้อมูล
            </Button>
          </form>
        </Container>
      </Layout>
    </>
  );
}
