import { colors } from "@/assets/colors"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Link } from "expo-router"
import { View, Text, Image } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useRouter } from "expo-router"
import { useForm, Controller } from "react-hook-form"
import { AuthSchema, AuthTypes } from "@/schemas/auth.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner-native"
import { useState } from "react"
import { googleOAuthLogin, loginWithPassword } from "@/api/auth.controller"
import { Feather } from '@expo/vector-icons';

const Login = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { control, handleSubmit, formState: { errors } } = useForm<AuthTypes>({
    resolver: zodResolver(AuthSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = async (data: AuthTypes) => {
    try {
      setIsLoading(true);
      await loginWithPassword(data)
      toast.success('welcome back✨')
      router.push("/tabs/home")
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
            Welcome Back
          </Text>
          <Text
            className="text-center"
            style={{ fontFamily: "readexLight", fontSize: 10 }}
          >
            Log in to access your favorite YouTube audio content,
            listen in the background, and enjoy uninterrupted playback anytime.
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
                  onChangeText={onChange}
                  value={value}
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
                  onChangeText={onChange}
                  value={value}
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
              Signing in...
            </Text>
            : <Text
              style={{ fontFamily: "readexRegular" }}
              className="text-white"
            >
              Sign In
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
          >
            Already have an account?
          </Text>
          <Link href="/register" className="">
            <Text
              style={{ fontFamily: "readexLight" }}
              className=" underline">Sign up</Text>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Login
