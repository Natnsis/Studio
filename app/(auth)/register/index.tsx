import { colors } from "@/assets/colors"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Link } from "expo-router"
import { View, Text, Image } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useRouter } from "expo-router"
import { Controller, useForm } from 'react-hook-form'
import { AuthSchema, AuthTypes } from "@/schemas/auth.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner-native"
import { useState } from "react"
import { googleOAuthLogin, registerWithPassword } from "@/api/auth.controller"
import { Feather } from '@expo/vector-icons';

const Register = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { formState: { errors }, handleSubmit, control
  } = useForm<AuthTypes>({
    resolver: zodResolver(AuthSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = async (data: AuthTypes) => {
    try {
      setIsLoading(true);
      await registerWithPassword(data)
      toast.success('user registred successfully✨')
      router.push('/login')
    } catch (error) {
      toast.error("invalid credentials")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <SafeAreaView style={{ backgroundColor: colors.background, height: '100%' }}>
      <View className="p-5">
        <Link href="/">
          <Feather name="arrow-left" size={20} />
        </Link>

        <View className="flex items-center ">
          <Image source={require("@/assets/images/logo.png")} style={{ width: 100, height: 100 }} />
        </View>

        <View>
          <Text
            className="text-center"
            style={{ fontFamily: "readexBold", fontSize: 25 }}
          >
            Just want to listen
          </Text>
          <Text
            className="text-center"
            style={{ fontFamily: "readexLight", fontSize: 10 }}
          >
            Welcome to our platform! Listen to YouTube videos as audio only,
            and enjoy them in the background while you do other things.
            Your favorite content, uninterrupted.
          </Text>
        </View>

        <View className="mt-5">
          <Text style={{ fontFamily: "readexRegular", fontSize: 13 }}>Email</Text>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <>
                <Input
                  placeholder="example@gmail.com"
                  style={{ fontFamily: "readexExtraLight" }}
                  keyboardType="email-address"
                  value={value}
                  onChangeText={onChange}
                />
                {errors.email && (
                  <Text
                    style={{
                      fontFamily: "readexExtraLight",
                      fontSize: 12,
                      color: colors.secondary
                    }}
                    className="capitalize"
                  >
                    {errors.email.message}
                  </Text>
                )}
              </>
            )}
          />
        </View>

        <View className="mt-2">
          <Text style={{ fontFamily: "readexRegular", fontSize: 13 }}>Password</Text>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <>
                <Input
                  placeholder="*******"
                  style={{ fontFamily: "readexExtraLight" }}
                  keyboardType="visible-password"
                  value={value}
                  onChangeText={onChange}
                />
                {errors.password && (
                  <Text
                    style={{
                      fontFamily: "readexExtraLight",
                      fontSize: 12,
                      color: colors.secondary
                    }}
                    className="capitalize"
                  >
                    {errors.password.message}
                  </Text>
                )}
              </>
            )}
          />
        </View>

        <Button
          style={{ backgroundColor: colors.primary }}
          className="rounded-full mt-5"
          onPress={handleSubmit(onSubmit)}
          disabled={isLoading}
        >
          {isLoading ?
            <Text
              style={{ fontFamily: "readexRegular" }}
              className="text-white"
            >
              Signing up...
            </Text>
            :
            <Text
              style={{ fontFamily: "readexRegular" }}
              className="text-white"
            >
              Sign Up
            </Text>
          }
        </Button>

        <View className="flex-row items-center my-5">
          <View className="flex-1 h-px bg-gray-300" />
          <Text className="mx-2" style={{ fontFamily: "readexLight" }}>or</Text>
          <View className="flex-1 h-px bg-gray-300" />
        </View>

        <Button
          variant="outline"
          className="flex-row items-center w-full jusitify-center"
          onPress={googleOAuthLogin}
        >
          <Image
            source={require("@/assets/images/google.png")}
            style={{ width: 20, height: 20 }}
          />
          <Text
            className="w-[60%]"
            style={{ fontFamily: "readexRegular" }}
          >
            Continue with Google
          </Text>
        </Button>

        <View className="flex-row justify-center items-center mt-4">
          <Text
            style={{ fontFamily: "readexLight" }}
          >Don't have an account? </Text>
          <Link href="/login" className="">
            <Text
              style={{ fontFamily: "readexLight" }}
              className=" underline">Sign in</Text>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Register
